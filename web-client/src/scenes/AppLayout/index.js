/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import WithAuthenticationHOC from '../../hoc/authenticate';

import PasswordPage from '../Auth/password';
import SiderMenu from '../../components/Layout/Sidebar';
import Header from '../../components/Layout/Header';

import OrderPage from '../Order';
import InvoicePage from '../Invoice';
import DetailInvoice from '../Invoice/detail';

import RequestPage from '../Request';

import ROUTER from '../../constants/router';
import select from '../../util/selector';
import { logOut } from '../Auth/actions';

const { Content } = Layout;

class AppLayout extends Component {
  state = { collapsed: true };

  componentDidMount() {
    const { user } = this.props;
    const evtSrc = new EventSource(`/event?topics=${user.get('ID')}`);
    evtSrc.onmessage = (e) => {
      if (e.data !== 'ping' && e.data !== 'hello') {
        console.log(JSON.parse(e.data));
        // const notificationData = JSON.parse(e.data);
        // notification.open({
        //   message: renderNotification(notificationData),
        //   btn: (
        //     <Button type="primary" onClick={() => this.showDetail(notificationData)}>
        //       Xem chi tiết
        //     </Button>
        //   ),
        //   placement: 'bottomLeft',
        // });
      }
    };
  }

  changePassword = () => this.props.history.push(ROUTER.AUTH.PASSWORD);

  toggleSidebar = () => this.setState(prevState => ({ collapsed: !prevState.collapsed }));

  render() {
    const { order, logOut, user } = this.props;
    const { collapsed } = this.state;
    return (
      <Layout
        style={{
          minHeight: '100vh',
          background: '#ffffff',
        }}
      >
        <SiderMenu
          user={user}
          collapsed={collapsed}
          onCollapse={this.toggleSidebar}
          logOut={logOut}
          changePassword={this.changePassword}
        />
        <Content>
          <Header user={user} collapsed={collapsed} toggleSidebar={this.toggleSidebar} />
          <Content
            style={{
              padding: '0 10px 10px 10px',
            }}
          >
            <Switch>
              <Route path={ROUTER.HOME} exact render={() => <OrderPage order={order} editMode={false} />} />
              <Route exact path={ROUTER.AUTH.PASSWORD} component={PasswordPage} />

              <Route exact path={ROUTER.ORDER.INDEX} render={() => <OrderPage order={order} editMode={false} />} />

              <Route exact path={ROUTER.INVOICE.INDEX} component={InvoicePage} />
              <Route exact path={ROUTER.INVOICE.DETAIL} component={DetailInvoice} />
              <Route exact path={ROUTER.INVOICE.EDIT} render={() => <OrderPage order={order} editMode />} />

              <Route exact path={ROUTER.REQUEST.INDEX} component={RequestPage} />
            </Switch>
          </Content>
        </Content>
      </Layout>
    );
  }
}

export default WithAuthenticationHOC(true)(
  connect(
    state => ({ order: select(state, 'orderReducer', 'order'), user: select(state, 'authReducer', 'authUser') }),
    dispatch => ({ logOut: () => dispatch(logOut()) }),
  )(AppLayout),
);
