import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, Button, Form, Row, Col, InputNumber,
} from 'antd';
import toJs from '../../../hoc/toJs';

const FormItem = Form.Item;

class RequestForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onRequest(values);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={10}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
              <FormItem label="Tên mặt hàng yêu cấu" required>
                {getFieldDecorator('product_name', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'Nhập tên mặt hàng yêu cầu',
                    },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
              <FormItem label="Số lượng" required>
                {getFieldDecorator('quantity', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: 'Nhập số lượng yêu cầu',
                    },
                  ],
                })(<InputNumber style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
              <FormItem label="Ghi chú">
                {getFieldDecorator('description', {
                  initialValue: ' ',
                })(<Input />)}
              </FormItem>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
              <FormItem label="Nhấn để yêu cầu" required>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Gửi yêu cầu
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

RequestForm.propTypes = {
  requests: PropTypes.array,
  form: PropTypes.object.isRequired,
  onRequest: PropTypes.func,
  onDelete: PropTypes.func,
};

RequestForm.defaultProps = {
  requests: [],
  onRequest: () => {},
  onDelete: () => {},
};

export default Form.create()(toJs(RequestForm));
