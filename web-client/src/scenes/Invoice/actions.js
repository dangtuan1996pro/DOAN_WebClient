import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';
import select from '../../util/selector';

export const setOrder = payload => ({
  type: TYPES.SET_ORDER,
  payload,
});

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

export const getInvoicesIfNeed = idArr => (dispatch, getState) => {
  const state = getState();
  const customerOptions = select(state, 'authReducer', 'customerInfo');
  const didInvalidate = select(state, 'invoiceReducer', 'didInvalidate');
  const isFetching = select(state, 'invoiceReducer', 'isFetching');
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

export const updateInvoice = (id, payload, meta) => async (dispatch) => {
  const api = API.INVOICE.updateInvoice(id);
  dispatch({ type: TYPES.UPDATING_INVOICE });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.UPDATE_INVOICE_SUCCESS });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({ type: TYPES.UPDATE_INVOICE_FAILURE });
    if (meta && meta.onError) {
      meta.onError(error);
    }
  }
};
