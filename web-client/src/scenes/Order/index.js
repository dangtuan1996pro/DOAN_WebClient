/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Row, Col, Card, notification, message,
} from 'antd';

import { Button } from 'antd/lib/radio';
import select from '../../util/selector';
import {
  getProducts, addItem, getInvoices, insertInvoice, getInvoiceById, updateInvoice,
} from './actions';
import { changeAlias } from '../../util/formatText';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import router from '../../constants/router';

class OrderPage extends Component {
  state = {
    products: [],
    filterText: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      products: nextProps.products
        .toJS()
        .filter(
          item => changeAlias(item.ProductInfo.Name.toLowerCase()).indexOf(changeAlias(prevState.filterText.toLowerCase()))
            >= 0,
        ),
    };
  }

  componentDidMount = () => {
    this.props.getProducts();
    if (this.props.editMode) {
      this.props.getInvoiceById(this.props.match.params.id);
    } else {
      this.props.addItem({ Items: [] });
    }
  };

  onChangeQuantity = (value, id) => {
    const order = this.props.order.toJS();
    order.Items = order.Items.map((item) => {
      if (item.ProductID === id) {
        return {
          ...item,
          Quantity: Number(value),
          TotalPrice: item.Price * Number(value),
        };
      }
      return item;
    });
    this.props.addItem(order);
  };

  onAddItem = (product, Quantity) => {
    const order = this.props.order.toJS();
    let isExist = false;
    if (order.Items.find(item => item.ProductID === product.ID)) {
      order.Items = order.Items.map((item) => {
        if (item.ProductID === product.ID) {
          isExist = true;
          return {
            ...item,
            Quantity: item.Quantity + Number(Quantity),
          };
        }
        return item;
      });
    }
    if (!isExist) {
      order.Items = order.Items.concat({
        Deliveried: false,
        DeliveriedQuantity: 0,
        Note: '',
        ProductID: product.ID,
        ProductName: product.ProductInfo.Name,
        Quantity: Number(Quantity),
        UnitID: product.ProductInfo.OtherUnitOfProduct[0].UnitId,
        UnitName: product.ProductInfo.OtherUnitOfProduct[0].Name,
        Price: product.ProductInfo.OtherUnitOfProduct[0].Price,
        TotalPrice: product.ProductInfo.OtherUnitOfProduct[0].Price * Number(Quantity),
        Weight: 0,
      });
    }
    this.props.addItem(order);
  };

  removeProduct = (id) => {
    const order = this.props.order.toJS();
    order.Items = order.Items.filter(item => item.ProductID !== id);
    this.props.addItem(order);
  };

  onFilterProduct = ({ target: { value } }) => this.setState(() => ({
    filterText: value,
  }));

  openNewInvoice = (invoiceId) => {
    notification.close(`invoice${invoiceId}`);
    this.props.history.push(router.INVOICE.DETAIL.replace(':id', invoiceId));
  };

  handleSubmit = (orderMeta) => {
    const orderItems = this.props.order.toJS();
    if (orderItems.Items.length) {
      if (this.props.editMode) {
        this.props.updateInvoice(
          this.props.match.params.id,
          {
            ...orderItems,
            ...orderMeta,
            TotalPrice: orderItems.Items.map(item => item.TotalPrice).reduce((a, b) => a + b, 0),
          },
          {
            onSuccess: () => {
              this.props.history.push(router.INVOICE.DETAIL.replace(':id', this.props.match.params.id));
              notification.success({ message: 'Sửa đơn hàng thành công.' });
            },
            onError: () => {
              notification.error({ message: 'Sửa đơn hàng thất bại.' });
            },
          },
        );
      } else {
        this.props.insertInvoice(
          {
            ...orderItems,
            ...orderMeta,
            TotalPrice: orderItems.Items.map(item => item.TotalPrice).reduce((a, b) => a + b, 0),
          },
          {
            onSuccess: (invoice) => {
              debugger;
              notification.open({
                message: 'Đơn hàng đã được tiếp nhận',
                key: `invoice${invoice.Data}`,
                btn: <Button onClick={() => this.openNewInvoice(invoice.Data)}>Xem đơn hàng</Button>,
                duration: 10
              });
              this.props.addItem({ Items: [] });
            },
            onError: () => notification.error({ message: 'Có lỗi xảy ra, vui lòng thử lại !' }),
          },
        );
      }
    } else {
      message.warning('Giỏ hàng trống');
    }
  };

  render() {
    const {
      customerOptions, editMode, order, isFetching,
    } = this.props;
    const { products } = this.state;
    return (
      <Row gutter={10}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ marginTop: 10 }}>
          <Card title="Danh sách mặt hàng">
            <ProductList
              products={products}
              onFilterProduct={this.onFilterProduct}
              onAddItem={this.onAddItem}
              isFetching={isFetching}
            />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ marginTop: 10 }}>
          <Card title="Giỏ hàng">
            <OrderForm
              editMode={editMode}
              options={customerOptions}
              order={order}
              removeProduct={this.removeProduct}
              onChangeQuantity={this.onChangeQuantity}
              onSubmit={this.handleSubmit}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  products: select(state, ['orderReducer', 'product'], 'items'),
  user: select(state, 'authReducer', 'authUser'),
  order: select(state, ['orderReducer', 'order'], 'item'),
  customerOptions: select(state, 'authReducer', 'customerInfo'),
  isFetching: select(state, ['orderReducer', 'product'], 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  getInvoices: params => dispatch(getInvoices(params)),
  addItem: payload => dispatch(addItem(payload)),
  insertInvoice: (payload, meta) => dispatch(insertInvoice(payload, meta)),
  updateInvoice: (id, payload, meta) => dispatch(updateInvoice(id, payload, meta)),
  getInvoiceById: id => dispatch(getInvoiceById(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(OrderPage));
