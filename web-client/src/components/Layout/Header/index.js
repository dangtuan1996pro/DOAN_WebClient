import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout, Row, Col, Modal, Button,
} from 'antd';
// import NotificationDropdown from './NotificationDropdown';
import toJs from '../../../hoc/toJs';

const { Header } = Layout;

class GlobalHeader extends React.Component {
  logOut = () => {
    Modal.confirm({
      title: 'Bạn chắc chắn đăng xuất ?',
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => {
        this.props.logOut();
      },
      onCancel() {},
    });
  };

  render() {
    const {
      // notifications,
      // showAll,
      // showDetail,
      collapsed,
      toggleSidebar,
    } = this.props;
    return (
      <Header style={{ background: '#fff', padding: 5, boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)' }}>
        <Row>
          <Col span={2}>
            <Button
              icon={collapsed ? 'menu-unfold' : 'menu-fold'}
              style={{
                border: 'none',
                fontSize: 20,
                cursor: 'pointer',
                transition: 'all 0.3s, padding 0s',
              }}
              onClick={toggleSidebar}
            />
          </Col>
          <Col span={20}>
            <h3 style={{
              textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 0,
            }}
            >
              Thực phẩm An Việt
            </h3>
          </Col>
          <Col span={2} style={{ float: 'right', height: '90%' }}>
            {/* <NotificationDropdown notifications={notifications} showAll={showAll} showDetail={showDetail}> */}
            {/* <Button */}
            {/* icon="bell" */}
            {/* style={{ */}
            {/* border: 'none', */}
            {/* fontSize: 20, */}
            {/* cursor: 'pointer', */}
            {/* transition: 'all 0.3s, padding 0s', */}
            {/* }} */}
            {/* /> */}
            {/* </NotificationDropdown> */}
          </Col>
        </Row>
      </Header>
    );
  }
}

GlobalHeader.propTypes = {
  collapsed: PropTypes.bool,
  logOut: PropTypes.func,
  user: PropTypes.object,
  onChangeProfile: PropTypes.func,
  notifications: PropTypes.array,
  showAll: PropTypes.func,
  showDetail: PropTypes.func,
  toggleSidebar: PropTypes.func,
};

GlobalHeader.defaultProps = {
  collapsed: false,
  logOut: () => {},
  user: {},
  onChangeProfile: () => {},
  notifications: [],
  showAll: () => {},
  showDetail: () => {},
  toggleSidebar: () => {},
};

export default toJs(GlobalHeader);
