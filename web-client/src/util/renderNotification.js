import { TYPES } from "../constants/notification";

export default item => {
  console.log(item.Type);
  switch (item.Type) {
  case TYPES.DRIVER_SHIP_TO_CUSTOMER:
    return `${item.CustomerName} đã nhận đơn hàng`;
  case TYPES.NEW_INVOICE:
    return `${item.CustomerName} đã đặt hàng`;
  case TYPES.UPDATE_INVOICE:
    return `${item.CustomerName} đã cập nhật đơn hàng`;
  case TYPES.NEW_REQUEST:
    return `${item.Data.CustomerName} đã yêu cầu ${item.Data.Quantity} ${item.Data.ProductName}`;
  case TYPES.UPDATE_REQUEST:
    return `${item.Data.CustomerName} đã cập nhật ${item.Data.Quantity} ${item.Data.ProductName}`;
  case TYPES.NEW_RESPONSE:
    return `${item.Data.UserName} đã trả lời ${item.Data.Response} cho ${item.Data.ProductName}`;
  default:
    return ` Thông báo mới`;
  }
};
