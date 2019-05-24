/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Row, Col, Card, notification,
} from 'antd';
import select from '../../util/selector';
import {
  insertRequest, getRequests, deleteRequest, getRequestsIfNeed,
} from './actions';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';

class OrderPage extends Component {
  state = {
    products: [],
    filterText: '',
  };

  static getDerivedStateFromProps(props) {
    const user = props.user.toJS();
    if (user.ID) {
      props.getRequestsIfNeed({ user_id: user.ID });
    }
    return null;
  }

  onRequest = payload => this.props.insertRequest(payload, {
    onSuccess: () => notification.success({ message: 'Yêu cầu thành công' }),
    onError: () => notification.error({ message: 'Có lỗi xảy ra, vui lòng thử lại !' }),
  });

  onDeleteRequest = id => this.props.deleteRequest(id, {
    onSuccess: () => notification.success({ message: 'Xoá yêu cầu thành công' }),
    onError: () => notification.error({ message: 'Có lỗi xảy ra, vui lòng thử lại !' }),
  });

  render() {
    const { requests, isFetching } = this.props;
    return (
      <Row gutter={10}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ marginTop: 10 }}>
          <Card title="Danh sách mặt hàng">
            <RequestForm onRequest={this.onRequest} />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ marginTop: 10 }}>
          <Card title="Yêu cầu mặt hàng mới  (Không có trong danh sách)">
            <RequestList dataSource={requests} isFetching={isFetching} onDelete={this.onDeleteRequest} />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  user: select(state, 'authReducer', 'authUser'),
  requests: select(state, 'requestReducer', 'items'),
  isFetching: select(state, 'requestReducer', 'isFetching'),
  didInvalidate: select(state, 'requestReducer', 'didInvalidate'),
});

const mapDispatchToProps = dispatch => ({
  insertRequest: (payload, meta) => dispatch(insertRequest(payload, meta)),
  getRequests: params => dispatch(getRequests(params)),
  deleteRequest: (id, meta) => dispatch(deleteRequest(id, meta)),
  getRequestsIfNeed: params => dispatch(getRequestsIfNeed(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(OrderPage));
