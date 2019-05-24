import { fromJS } from 'immutable';
import TYPES from '../../constants/actionTypes';

const listState = fromJS({
  items: [],
  isFetching: false,
  didInvalidate: true,
  updatedAt: 0,
});

const invoice = (state = listState, action) => {
  switch (action.type) {
  case TYPES.GETTING_INVOICES:
    return state.set('isFetching', true);
  case TYPES.GET_INVOICES_FAILURE:
    return state.merge({
      isFetching: false,
    });
  case TYPES.GET_INVOICES_SUCCESS:
    return state.merge({
      isFetching: false,
      didInvalidate: false,
      items: action.payload,
    });
  case TYPES.INSERT_INVOICE_SUCCESS:
    return state.merge({ didInvalidate: true });
  default:
    return state;
  }
};

export default invoice;
