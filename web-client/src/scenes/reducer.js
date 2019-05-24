import { combineReducers } from 'redux-immutable';

import authReducer from './Auth/reducer';
import orderReducer from './Order/reducer';
import invoiceReducer from './Invoice/reducer';
import requestReducer from './Request/reducer';

export default combineReducers({
  authReducer,
  orderReducer,
  invoiceReducer,
  requestReducer,
});
