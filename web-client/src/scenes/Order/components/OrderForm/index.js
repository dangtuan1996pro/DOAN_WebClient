import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Select, DatePicker, Row, Col, Button,
} from 'antd';
import moment from 'moment';
import toJs from '../../../../hoc/toJs';
import ItemList from './ItemList';

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
});

class SelectCustomerForm extends Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const selectedCustomer = this.props.options.find(item => item.ID === values.CustomerID);
          this.props.onSubmit({
            CustomerID: selectedCustomer.ID,
            CustomerName: selectedCustomer.Name,
            CustomerCode: selectedCustomer.Code,
            Address: selectedCustomer.Address,
            TimeWindows: selectedCustomer.TimeWindows,
            ServerTime: selectedCustomer.ServerTime,
            DeliveryTime: moment(values.DeliveryTime).unix(),
            DeliveryVehicle: 0,
          });
          this.props.form.resetFields();
        }
      });
    };

    render() {
      const {
        options,
        order,
        editMode,
        onChangeQuantity,
        removeProduct,
        form: { getFieldDecorator },
      } = this.props;
      return (
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={10}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
              <Form.Item label="Thông tin đơn hàng" required>
                {getFieldDecorator('CustomerID', {
                  initialValue: editMode ? order.CustomerID : options && options.length && options[0].ID,
                  rules: [
                    {
                      required: true,
                      message: 'Chọn nơi nhận hàng',
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }}>
                    {options.map((item, index) => (
                      <Select.Option key={`option${index + 1}`} value={item.ID}>
                        {item.Name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
              <Form.Item label="Ngày giao hàng">
                {getFieldDecorator('DeliveryTime', {
                  initialValue: editMode
                    ? moment(order.DeliveryTime)
                    : moment()
                      .add(1, 'd')
                      .hour(6)
                      .minute(0),
                  rules: [
                    {
                      required: true,
                      message: 'Chọn ngày giao hàng',
                    },
                  ],
                })(
                  <DatePicker
                    style={{ width: '100%' }}
                    showTime={{ format: 'HH:mm' }}
                    format="DD/MM/YYYY HH:mm"
                    disabledDate={current => (
                      editMode
                      || (current
                      && current < moment()
                        .add(1, 'd')
                        .hour(0)
                        .valueOf())
                    )}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <ItemList dataSource={order.Items} removeProduct={removeProduct} onChangeQuantity={onChangeQuantity} />
          <Row>
            <Col span={12}>
                        Tổng cộng:
              {' '}
              {formatter.format(order.Items.map(item => item.TotalPrice).reduce((a, b) => a + b, 0))}
            </Col>
            <Col span={12}>
              <Button
                onClick={this.checkout}
                type="primary"
                style={{ float: 'right', marginTop: 10 }}
                disabled={
                  !editMode
                  && this.props.form.getFieldValue('DeliveryTime')
                  && this.props.form.getFieldValue('DeliveryTime').dayOfYear() === moment().add(1, 'day').dayOfYear()
                  && moment().hours() >= 16
                  && moment().minutes() >= 0
                  && moment().milliseconds() >= 0
                }
                htmlType="submit"
              >
                {editMode ? 'Cập nhật' : 'Gửi đơn hàng'}
              </Button>
            </Col>
          </Row>
        </Form>
      );
    }
}

SelectCustomerForm.propTypes = {
  options: PropTypes.array,
  form: PropTypes.object.isRequired,
  order: PropTypes.object,
  editMode: PropTypes.bool,
  onChangeQuantity: PropTypes.func,
  removeProduct: PropTypes.func,
  onSubmit: PropTypes.func,
};

SelectCustomerForm.defaultProps = {
  options: [],
  order: { Items: [] },
  editMode: false,
  onChangeQuantity: () => {},
  removeProduct: () => {},
  onSubmit: () => {},
};

export default Form.create()(toJs(SelectCustomerForm));
