/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';

import { getInvoicesIfNeed } from './actions';
import InvoiceList from './components/InvoiceList';
import select from '../../util/selector';

class History extends Component {
  state = {};

  static getDerivedStateFromProps(nextProps) {
    const customerOptions = nextProps.customerOptions.toJS();
    if (customerOptions.length) {
      nextProps.getInvoicesIfNeed(customerOptions.map(item => item.ID));
    }
    return null;
  }

  render() {
    const { invoices, isFetching } = this.props;
    return (
      <Card title="Danh sách đơn hàng" style={{ marginTop: 10 }}>
        <InvoiceList dataSource={invoices} isFetching={isFetching} />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  customerOptions: select(state, 'authReducer', 'customerInfo'),
  invoices: select(state, 'invoiceReducer', 'items'),
  isFetching: select(state, 'invoiceReducer', 'isFetching'),
});

const mapDispatchToProps = dispatch => ({
  getInvoicesIfNeed: params => dispatch(getInvoicesIfNeed(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
