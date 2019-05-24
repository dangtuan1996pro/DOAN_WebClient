import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';
import select from '../../util/selector';

export const getProducts = () => async (dispatch) => {
  const api = API.PRODUCT.getProducts();
  dispatch({
    type: TYPES.GETTING_PRODUCTS,
  });
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200) {
    dispatch({
      type: TYPES.GET_PRODUCTS_SUCCESS,
      payload: response.data.Data,
    });
  } else {
    dispatch({ type: TYPES.GET_PRODUCTS_FAILURE });
  }
};

export const addItem = payload => ({
  type: TYPES.ADD_ITEM,
  payload,
});

export const setOrder = payload => ({
  type: TYPES.SET_ORDER,
  payload,
});

export const insertInvoice = (payload, meta) => async (dispatch) => {
  const api = API.INVOICE.insertInvoice();
  dispatch({ type: TYPES.INSERTING_INVOICE });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.INSERT_INVOICE_SUCCESS });
    if (meta && meta.onSuccess) {
      meta.onSuccess(response.data);
    }
  } else {
    dispatch({ type: TYPES.INSERT_INVOICE_FAILURE });
    if (meta && meta.onError) {
      meta.onError(error);
    }
  }
};

export const getInvoices = idArr => async (dispatch) => {
  const api = API.INVOICE.getInvoices();
  dispatch({ type: TYPES.GETTING_INVOICES });
  let payload = [];
  if (idArr.length > 0) {
    Promise.all(idArr.map(customer_id => apiCall({ ...api, params: { customer_id } }))).then((resArr) => {
      resArr.forEach(({ response, error }) => {
        if (!error && response.status === 200) {
          payload = [...payload, ...response.data.Data];
        }
      });
      dispatch({ type: TYPES.GET_INVOICES_SUCCESS, payload });
    });
  } else {
    dispatch({ type: TYPES.GET_INVOICES_FAILURE });
  }
};

export const getInvoicesIfNeed = idArr => async (dispatch, getState) => {
  const state = getState();
  const customerOptions = select(state, 'authReducer', 'customerInfo');
  const didInvalidate = select(state, ['orderReducer', 'invoice'], 'didInvalidate');
  const isFetching = select(state, ['orderReducer', 'invoice'], 'isFetching');
  if (customerOptions.toJS().length !== 0 && !isFetching && didInvalidate) {
    dispatch(getInvoices(idArr));
  }
};

export const getInvoiceById = id => async (dispatch) => {
  const api = API.INVOICE.getInvoices();
  dispatch({ type: TYPES.GETTING_INVOICE_BY_ID });
  if (id) {
    const { response, error } = await apiCall({ ...api, params: { id } });
    if (!error && response.status === 200) {
      dispatch({
        type: TYPES.GET_INVOICE_BY_ID_SUCCESS,
        payload: response.data.Data.length ? response.data.Data[0] : {},
      });
    } else {
      dispatch({ type: TYPES.GET_INVOICE_BY_ID_FAILURE });
    }
  } else {
    dispatch({ type: TYPES.GET_INVOICE_BY_ID_FAILURE });
  }
};

export const updateInvoice = (id, payload, meta) => async () => {
  const api = API.INVOICE.updateInvoice(id);
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else if (meta && meta.onError) {
    meta.onError(error);
  }
};
export const cancleInvoice = (id, payload, meta) => async () => {
  const api = API.INVOICE.cancleInvoice(id);
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess(id);
    }
  } else if (meta && meta.onError) {
    meta.onError(error);
  }
};
export const insertRequest = (payload, meta) => async () => {
  const api = API.REQUEST.insertRequest();
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else if (meta && meta.onError) {
    meta.onError(error);
  }
};

export const getRequests = params => async (dispatch) => {
  const api = API.REQUEST.getRequests();
  dispatch({ type: TYPES.GETTING_REQUESTS });
  const { response, error } = await apiCall({ ...api, params });
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.GET_REQUESTS_SUCCESS, payload: response.data.Data });
  } else {
    dispatch({ type: TYPES.GET_REQUESTS_FAILURE });
  }
};

export const deleteRequest = (id, meta) => async () => {
  const api = API.REQUEST.deleteRequest(id);
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else if (meta && meta.onError) {
    meta.onError(error);
  }
};
