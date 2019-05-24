import { fromJS } from 'immutable';
import TYPES from '../../constants/actionTypes';

const requestState = fromJS({
  items: [],
  meta: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
});

const request = (state = requestState, action) => {
  switch (action.type) {
  case TYPES.GETTING_REQUESTS:
    return state.set('isFetching', true);
  case TYPES.GET_REQUESTS_SUCCESS:
    return state.merge({
      items: action.payload,
      isFetching: false,
      didInvalidate: false,
    });

  case TYPES.GET_REQUESTS_FAILURE:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
    });
  case TYPES.INSERT_REQUEST_SUCCESS:
  case TYPES.UPDATE_REQUEST_SUCCESS:
  case TYPES.DELETE_REQUEST_SUCCESS:
    return state.merge({
      didInvalidate: true,
    });

  default:
    return state;
  }
};

export default request;
