import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Card, Divider, Button, Tooltip, notification,
} from 'antd';
import moment from 'moment';

import ItemList from './components/ItemList';
import ReviewForm from './components/ReviewForm';
import { INVOICE_STATUS } from '../../constants/enum';
import ROUTER from '../../constants/router';
import { getInvoiceById, setOrder } from './actions';
import { updateInvoice,cancleInvoice } from '../Order/actions';

import select from '../../util/selector';
import CurrencyFormat from 'react-currency-format';

class Detail extends Component {
  state = {
    invoice: {},
  };

  static getDerivedStateFromProps(nextProps) {
    const invoice = nextProps.invoice.toJS();
    return {
      invoice,
    };
  }

  componentDidMount() {
    this.props.getInvoiceById(this.props.match.params.id);
  }

  editInvoice = () => {
    this.props.setOrder(this.state.invoice);
    this.props.history.push(ROUTER.INVOICE.EDIT.replace(':id', this.props.match.params.id));
  };

  // onUpdateNode = (Note) => {
  //   this.props.updateInvoice(
  //     this.props.match.params.id,
  //     {
  //       ...this.state.invoice,
  //       Note,
  //     },
  //     {
  //       onSuccess: () => {
  //         notification.success({ message: 'Đánh giá thành công.' });
  //       },
  //       onError: () => {
  //         notification.error({ message: 'Đánh giá thất bại.' });
  //       },
  //     },
  //   );
  // };
  onUpdateNode = (Note) => {
    this.props.cancleInvoice(
      this.props.match.params.id,
      {
              ...this.state.invoice,
              Note,
            },
      {
        onSuccess: (id) => {
          debugger;
          this.props.history.push(ROUTER.INVOICE.INDEX);
          this.render();
          notification.success({ message: 'Hủy đơn hàng thành công.' });
        },
        onError: () => {
          notification.error({ message: 'Hủy thất bại.' });
        },
      },
    );
  };
  canEditInvoice = invoice => invoice.Status === 0;
    // && moment(invoice.DeliveryTime).date() >= moment().date()
    // && moment(invoice.DeliveryTime).hour() < 17;

  render() {
    const { invoice } = this.state;
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });
    return (
      <React.Fragment>
        <Row style={{ margin: 10 }}>
          <span style={{ float: 'left' }}>
            Chi tiết đơn hàng #
            {invoice.Code}
            {' '}
-
            {' '}
            <b>{INVOICE_STATUS[invoice.Status]}</b>
          </span>
          <span style={{ float: 'right' }}>
            Ngày giao:
            {moment(invoice.DeliveryTime).format('DD/MM/YYYY')}
          </span>
        </Row>
        <Card
          title={<h2>{invoice.CustomerName}</h2>}
          extra={(
            <Tooltip title="Sửa thông tin đơn hàng">
              <Button
                icon="edit"
                shape="circle"
                type="primary"
                onClick={() => this.editInvoice()}
                disabled={!this.canEditInvoice(invoice)}
              />
            </Tooltip>
          )}
        >
          <ItemList
            style={{ margin: '10px' }}
            title={() => (
              <div>
                <h4>
                  {invoice.Address
                    && `${invoice.Address.StreetNumber}, ${invoice.Address.Street}, ${invoice.Address.District} `}
                </h4>
              </div>
            )}
            dataSource={invoice.Items}
            showDeleteButton={false}
          />
          <h4 style={{ textAlign: "right", color: "bf0404", fontSize: 20, margin: 10}}>
            Thành tiền:&nbsp;
            {formatter.format(invoice.TotalPrice)}
          </h4>
          <Divider />
          <ReviewForm defaultValue={invoice.Note} onUpdateNode={this.onUpdateNode} status={invoice.Status}/>
        </Card>
      </React.Fragment>
    );
  }
}

Detail.propTypes = {
  getInvoiceById: PropTypes.func,
  setOrder: PropTypes.func,
  updateInvoice: PropTypes.func,
  cancleInvoice: PropTypes.func,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

Detail.defaultProps = {
  getInvoiceById: () => {},
  setOrder: () => {},
  updateInvoice: () => {},
  cancleInvoice: () => {},
};

const mapStateToProps = state => ({
  invoice: select(state, ['orderReducer', 'detail'], 'item'),
});

const mapDispatchToProps = dispatch => ({
  getInvoiceById: id => dispatch(getInvoiceById(id)),
  setOrder: payload => dispatch(setOrder(payload)),
  updateInvoice: (id, payload, meta) => dispatch(updateInvoice(id, payload, meta)),
  cancleInvoice: (id, payload, meta) => dispatch(cancleInvoice(id, payload, meta)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
