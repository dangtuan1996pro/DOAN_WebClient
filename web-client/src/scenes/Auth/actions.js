import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';

export const login = payload => async (dispatch) => {
  const api = API.AUTH.login();
  dispatch({
    type: TYPES.LOGGING_IN,
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({
      type: TYPES.LOG_IN_SUCCESS,
      payload: response.data.Data,
    });
    const apiAfter = API.CUSTOMER.getCustomers();
    apiCall(apiAfter).then(({ response, error }) => {
      if (!error && response.status === 200) {
        dispatch(saveCustomerInfo(response.data.Data));
      } else {
        dispatch(saveCustomerError());
      }
    });
  } else {
    dispatch({
      type: TYPES.LOG_IN_FAILURE,
    });
  }
};

export const saveCustomerInfo = payload => ({
  type: TYPES.SAVE_CUSTOMER_INFO,
  payload,
});

export const saveCustomerError = () => ({
  type: TYPES.SAVE_CUSTOMER_ERROR,
});

export const loginWithToken = location => async (dispatch) => {
  const api = API.AUTH.loginWithToken();
  dispatch({
    type: TYPES.LOGGING_IN,
  });
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200) {
    dispatch({
      type: TYPES.LOG_IN_SUCCESS,
      payload: response.data.Data,
      location,
    });
    const apiAfter = API.CUSTOMER.getCustomers();
    apiCall(apiAfter).then(({ response, error }) => {
      if (!error && response.status === 200) {
        dispatch(saveCustomerInfo(response.data.Data));
      } else {
        dispatch(saveCustomerError());
      }
    });
  } else {
    dispatch({
      type: TYPES.LOG_IN_FAILURE,
    });
  }
};

export const changePassword = (payload, meta) => async () => {
  const api = API.AUTH.changePassword();
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else if (meta && meta.onError) {
    meta.onError();
  }
};

export const logOut = () => ({
  type: TYPES.LOG_OUT,
});
