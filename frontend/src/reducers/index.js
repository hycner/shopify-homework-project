// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import accounts from './accounts';
import products from './products';

export default combineReducers({
  accounts,
  products,
  router: routerReducer,
});
