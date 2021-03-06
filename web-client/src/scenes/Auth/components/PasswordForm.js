import React from 'react';
import PropTypes from 'prop-types';

import {
  Form, Input, Button, notification,
} from 'antd';

class ChangePasswordForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        const { OldPassword, NewPassword, ConfirmPasswd } = values;
        if (ConfirmPasswd === NewPassword) {
          this.props.onSubmit({
            OldPassword,
            NewPassword,
          });
        } else {
          notification.warning({
            message: 'Mật khẩu mới và mật khẩu xác nhận phải giống nhau !',
          });
        }
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Mật khẩu cũ">
          {getFieldDecorator('OldPassword', {
            rules: [
              {
                required: true,
                message: `${'Nhập mật khẩu cũ'}!`,
              },
            ],
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item label="Mật khẩu mới">
          {getFieldDecorator('NewPassword', {
            rules: [
              {
                required: true,
                message: `${'Nhập mật khẩu mới'}!`,
              },
            ],
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item label="Xác nhận mật khẩu mới">
          {getFieldDecorator('ConfirmPasswd', {
            rules: [
              {
                required: true,
                message: `${'Xác nhận mật khẩu mới'}!`,
              },
            ],
          })(<Input type="password" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ float: 'right' }} htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

ChangePasswordForm.propTypes = {
  form: PropTypes.object.isRequired,
};

export default Form.create()(ChangePasswordForm);
