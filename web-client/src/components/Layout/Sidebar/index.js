import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu, Layout, Icon, Drawer, Avatar,
} from 'antd';
import { Link } from 'react-router-dom';
import ROUTER from '../../../constants/router';

import toJs from '../../../hoc/toJs';

const { Sider } = Layout;

class MenuBar extends React.Component {
  render() {
    const {
      collapsed, onCollapse, logOut, user,
    } = this.props;
    return (
      <Drawer
        visible={!collapsed}
        width={200}
        placement="left"
        closable={false}
        onClose={() => onCollapse(true)}
        style={{
          padding: 0,
          height: '100vh',
        }}
      >
        <Sider theme="dark" style={{ boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)', height: '100vh', width: '100%' }}>
          <div
            style={{
              margin: 24,
            }}
          >
            <Link to={ROUTER.HOME}>
              <Avatar
                src={
                  user.Avatar
                    ? user.Avatar
                    : 'https://static.giaodichnongsan.vn/images/5a210e97b9d04c3dd16542bd_1f02694e-d97f-4625-a03d-0de4cbe3ad5d.png'
                }
                size={120}
                style={{ margin: 16 }}
              />
              <div style={{ marginRight: 10, textAlign: 'center' }}>
                <b>{user.DisplayName}</b>
              </div>
            </Link>
          </div>
          <Menu onClick={this.handleClick} mode="vertical" theme="dark">
            <Menu.Item key="history">
              <Link to={ROUTER.INVOICE.INDEX}>
                <Icon type="clock-circle" />
                <span>Lịch sử</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="cart">
              <Link to={ROUTER.ORDER.INDEX}>
                <Icon type="shopping-cart" />
                <span>Đặt hàng</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="request">
              <Link to={ROUTER.REQUEST.INDEX}>
                <Icon type="database" />
                <span>Yêu cầu</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="password-change">
              <Link to={ROUTER.AUTH.PASSWORD}>
                <Icon type="edit" />
                <span>Đổi mật khẩu</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="change-pass" onClick={logOut}>
              <Icon type="logout" />
              <span>Đăng xuất</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Drawer>
    );
  }
}

MenuBar.propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
};

MenuBar.defaultProps = {
  onCollapse: () => {},
  collapsed: false,
};

export default toJs(MenuBar);
