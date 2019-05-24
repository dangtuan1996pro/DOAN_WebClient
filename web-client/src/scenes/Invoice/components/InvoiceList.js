import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ToJS from '../../../hoc/toJs';
import { INVOICE_STATUS } from '../../../constants/enum';
import router from '../../../constants/router';
import WithLoadingHOC from '../../../hoc/loading';

function InvoiceList(props) {
  const { dataSource } = props;
  return (
    <List
      dataSource={dataSource}
      renderItem={(record, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            title={
              record.Items
              && record.Items.length > 0
              && `${record.Items[0].ProductName} và ${record.Items.length - 1} sản phẩm khác`
            }
            description={(
              <div>
                <div>
                  Mã đơn hàng:
                  <Link to={router.INVOICE.DETAIL.replace(':id', record.ID)}>{` ${record.Code}`}</Link>
                </div>
                <div>{`Ngày giao hàng: ${moment(record.DeliveryTime).format('DD/MM/YYYY')}`}</div>
                <div>{`Trạng thái: ${INVOICE_STATUS[record.Status]}`}</div>
              </div>
            )}
          />
        </List.Item>
      )}
    />
  );
}

InvoiceList.propTypes = {
  dataSource: PropTypes.array,
  isFetching: PropTypes.bool,
};

InvoiceList.defaultProps = {
  dataSource: [],
  isFetching: false,
};

export default ToJS(WithLoadingHOC(InvoiceList));
