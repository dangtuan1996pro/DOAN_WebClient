import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import NotiList from './NotiList';

const NotificationDropdown = ({
  children, notifications, showAll, showDetail,
}) => (
  <Popover
    trigger="click"
    title="Thông báo"
    placement="bottomRight"
    content={(
      <React.Fragment>
        <NotiList notifications={notifications} showDetail={showDetail} />
        <div key="all" style={{ textAlign: 'center', padding: 10 }}>
          <a role="img" onClick={showAll}>
            Xem toàn bộ thông báo
          </a>
        </div>
      </React.Fragment>
    )}
  >
    {children}
  </Popover>
);

NotificationDropdown.propTypes = {
  notifications: PropTypes.array,
  showAll: PropTypes.func,
  showDetail: PropTypes.func,
};

NotificationDropdown.defaultProps = {
  notifications: [],
  showAll: () => {},
  showDetail: () => {},
};

export default NotificationDropdown;
