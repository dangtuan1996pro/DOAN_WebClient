import { fromJS } from 'immutable';
import TYPES from '../../constants/actionTypes';

const initialState = fromJS({
  isFetching: false,
  didInvalidate: true,
  isAuthenticated: false,
  error: false,
  authUser: {},
  role: {},
  api: {},
  forwardLocation: {},
  customerInfo: [],
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case TYPES.LOGGING_IN:
    return state.merge({
      isAuthenticated: false,
      isFetching: true,
      error: false,
    });

  case TYPES.LOG_IN_SUCCESS:
    /* eslint no-case-declarations: 0 */
    const {
      payload: { Token, User },
      location,
    } = action;
    if (User && User.Role !== 2) {
      return state.merge({
        isAuthenticated: false,
        isFetching: false,
        error: true,
      });
    }
    localStorage.setItem('jwt', Token);
    return state.merge({
      isAuthenticated: true,
      isFetching: false,
      authUser: User,
      error: false,
      forwardLocation: location,
    });

  case TYPES.LOG_IN_FAILURE:
    return state.merge({
      isAuthenticated: false,
      isFetching: false,
      error: true,
    });
  case TYPES.SAVE_CUSTOMER_INFO:
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', action.payload.ID);
    }
    return state.merge({
      customerInfo: action.payload,
    });

  case TYPES.SAVE_CUSTOMER_ERROR:
    return state.merge({
      error: true,
    });
  case TYPES.LOG_OUT:
    localStorage.clear();
    return state.merge(initialState);

  default:
    return state;
  }
};

export default authReducer;
