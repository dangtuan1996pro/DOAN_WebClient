import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, List } from 'antd';
import toJs from '../../../hoc/toJs';
import WithLoading from '../../../hoc/loading';

const RequestList = ({ dataSource, onDelete }) => (
  <List
    dataSource={dataSource}
    renderItem={(item, index) => (
      <List.Item
        key={index}
        actions={[<Button key="delete" type="danger" shape="circle" icon="delete" onClick={() => onDelete(item.ID)} />]}
      >
        <List.Item.Meta
          title={`${item.ProductName} (${item.Quantity}) - ${item.Status === 1 ? 'Đã xử lí' : 'Đang xử lí'}`}
          description={`Trả lời: ${item.Response}`
          }
        />
      </List.Item>
    )}
  />
);

RequestList.propTypes = {
  dataSource: PropTypes.array,
  onDelete: PropTypes.func,
};

RequestList.defaultProps = {
  dataSource: [],
  onDelete: () => {},
};

export default WithLoading(Form.create()(toJs(RequestList)));
