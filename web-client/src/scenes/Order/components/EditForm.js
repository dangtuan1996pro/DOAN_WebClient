import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Input, List, Button, Icon, DatePicker,
} from 'antd';
import moment from 'moment';
import ToJS from '../../../hoc/toJs';

class ItemList extends Component {
    checkQuantity = ({ target: { value } }, id) => {
      if (Number(value) > 0) {
        this.props.onChangeQuantity(value, id);
      } else {
        this.props.onChangeQuantity(0, id);
      }
    };

    render() {
      const { dataSource, removeProduct, title } = this.props;
      return (
        <List
          header={title()}
          dataSource={dataSource}
          renderItem={(record, index) => (
            <List.Item
              key={index}
              actions={[
                <Button
                  key="delete"
                  shape="circle"
                  type="danger"
                  onClick={() => removeProduct(record.ProductID)}
                >
                  <Icon type="delete" />
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={record.ProductName}
                description={(
                  <Input
                    type="number"
                    defaultValue={record.Quantity}
                    value={record.Quantity}
                    addonAfter={<div style={{ width: '50px' }}>{record.UnitName}</div>}
                    onChange={e => this.props.onChangeQuantity(e.target.value, record.ProductID)}
                    onBlur={e => this.checkQuantity(e, record.ProductID)}
                  />
                )}
              />
            </List.Item>
          )}
        />
      );
    }
}

ItemList.propTypes = {
  dataSource: PropTypes.array,
  removeProduct: PropTypes.func,
  onChangeQuantity: PropTypes.func,
  title: PropTypes.func,
  isConfirm: PropTypes.bool,
};

ItemList.defaultProps = {
  dataSource: [],
  removeProduct: () => {},
  onChangeQuantity: () => {},
  title: () => {},
  isConfirm: false,
};

const OrderCard = ({
  order, onChangeDeliveryTime, removeProduct, onChangeQuantity,
}) => (
  <Fragment>
    <ItemList
      dataSource={order.Items}
      removeProduct={removeProduct}
      onChangeQuantity={onChangeQuantity}
      title={() => (
        <div>
          <h3>
                            Ngày giao:
            {' '}
            <DatePicker
              defaultValue={
                order.DeliveryTime
                  ? moment(order.DeliveryTime)
                  : moment()
                    .add(1, 'd')
                    .hour(6)
                    .minute(0)
              }
              showTime={{ format: 'HH:mm' }}
              onChange={onChangeDeliveryTime}
              format="DD/MM/YYYY HH:mm"
              disabledDate={current => (
                current
                                        && current
                                            < moment()
                                              .add(1, 'd')
                                              .hour(0)
                                              .valueOf()
              )}
            />
          </h3>
        </div>
      )}
    />
  </Fragment>
);
OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  onChangeDeliveryTime: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default ToJS(OrderCard);
