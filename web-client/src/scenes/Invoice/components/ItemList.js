import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import toJs from '../../../hoc/toJs';
import CurrencyFormat from 'react-currency-format';
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
});
const ItemList = ({ dataSource }) => {
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'ProductName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'Quantity',
      render: (text, record) => `${record.Quantity} ${record.UnitName}`,
    },
    {
      title: 'Giá',
      dataIndex: 'TotalPrice',
      render: (text, record) => `${formatter.format(record.TotalPrice)}`
    },
  ];
  return <Table columns={columns} dataSource={dataSource} bordered rowKey="ID" pagination={false} />;
};

ItemList.propTypes = {
  dataSource: PropTypes.array,
};

ItemList.defaultProps = {
  dataSource: [],
};

export default toJs(ItemList);
