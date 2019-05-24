/* eslint react/prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Card, notification,
} from 'antd';
import { changePassword } from './actions';
import PasswordForm from './components/PasswordForm';
import router from '../../constants/router';

class ChangePassword extends React.Component {
  changePassword = (payload) => {
    this.props.changePassword(payload, {
      onSuccess: () => {
        this.props.history.push(router.ORDER.INDEX);
        notification.success({ message: 'Đổi mật khẩu thành công' });
      },
      onError: () => {
        notification.error({ message: 'Đổi mật khẩu thất bại' });
      },
    });
  };

  render() {
    return (
      <Row>
        <Col
          xs={{ span: 20, offset: 2 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 18, offset: 7 }}
          lg={{ span: 14, offset: 5 }}
        >
          <Card style={{ marginTop: 24 }} title="Đối mật khẩu">
            <PasswordForm onSubmit={this.changePassword} />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    changePassword: (payload, meta) => dispatch(changePassword(payload, meta)),
  }),
)(ChangePassword);
