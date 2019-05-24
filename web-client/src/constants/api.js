const HEADERS = {
  DEFAULT_HEADER: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  JWT_HEADER: () => ({
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: localStorage.getItem('jwt'),
  }),
  file_header: () => ({
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('jwt'),
  }),
};

export const API = {
  AUTH: {
    login: () => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/account/v1/users/login`,
      endPoint: `/orderApi/Account`,
      method: 'POST',
      headers: HEADERS.DEFAULT_HEADER,
    }),
    loginWithToken: () => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/account/v1/users/login/token`,
      endPoint: `/orderApi/Account/LoginWithToken`,
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    changePassword: () => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/account/v1/users/password`,
      endPoint: `/orderApi/Account`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  CUSTOMER: {
    getCustomers: () => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/customer/v1/customers/same-cart-code`,
      endPoint: `/orderApi/Customer/GetByToken`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  PRODUCT: {
    getProducts: () => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/product/v1/me/price-table`,
      endPoint: `/orderApi/ProductCustomer`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    getFavoriteProducts: () => ({
      endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/product/v1/me/price-table`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    toggleFavorite: () => ({
      endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/product/v1/mark-favorite`,
      method: 'PATCH',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  PRODUCT_UNIT: {
    getProductUnits: () => ({
      endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/product/v1/unit/productunits`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  INVOICE: {
    insertInvoice: () => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/invoice/v1/invoice`,
      endPoint: '/orderApi/Invoice',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getInvoices: () => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/invoice/v1/invoice`,
      endPoint: `/orderApi/Invoice`,
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateInvoice: id => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/invoice/v1/invoice/${id}`,
      endPoint: `/orderApi/Invoice/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
    cancleInvoice: id => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/invoice/v1/invoice/${id}`,
      endPoint: `/orderApi/InvoiceItem/${id}`,
      method: 'PUT',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  REQUEST: {
    insertRequest: () => ({
      //endPoint: `${process.env.REACT_APP_API_DOMAIN}/api/product/v1/product-request`,
      endPoint: `/orderApi/ProductRequest`,
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getRequests: () => ({
      //endPoint: '/api/product/v1/product-request',
      endPoint: '/orderApi/ProductRequest',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteRequest: id => ({
      //endPoint: `/api/product/v1/product-request/${id}`,
      endPoint: `/orderApi/ProductRequest/${id}`,
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
};
