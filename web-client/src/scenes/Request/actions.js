import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';
import select from '../../util/selector';

export const insertRequest = (payload, meta) => async (dispatch) => {
  const api = API.REQUEST.insertRequest();
  dispatch({ type: TYPES.INSERTING_REQUEST });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.INSERT_REQUEST_SUCCESS });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({ type: TYPES.INSERT_REQUEST_FAILURE });
    if (meta && meta.onError) {
      meta.onError(error);
    }
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

export const getRequestsIfNeed = params => (dispatch, getState) => {
  const state = getState();
  const isFetching = select(state, 'requestReducer', 'isFetching');
  const didInvalidate = select(state, 'requestReducer', 'didInvalidate');
  if (!isFetching && didInvalidate) {
    dispatch(getRequests(params));
  }
};

export const updateRequest = (id, payload, meta) => async (dispatch) => {
  const api = API.REQUEST.deleteRequest(id);
  dispatch({ type: TYPES.UPDATING_REQUEST });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.UPDATE_REQUEST_SUCCESS });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({ type: TYPES.UPDATE_REQUEST_FAILURE });
    if (meta && meta.onError) {
      meta.onError(error);
    }
  }
};

export const deleteRequest = (id, meta) => async (dispatch) => {
  const api = API.REQUEST.deleteRequest(id);
  dispatch({ type: TYPES.DELETING_REQUEST });
  const { response, error } = await apiCall({ ...api });
  if (!error && response.status === 200) {
    dispatch({ type: TYPES.DELETE_REQUEST_SUCCESS });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({ type: TYPES.DELETE_REQUEST_FAILURE });
    if (meta && meta.onError) {
      meta.onError(error);
    }
  }
};
