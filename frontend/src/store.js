// @flow
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from './reducers';

export let history = createHistory();

let middleware = [routerMiddleware(history), thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

let store = createStore(reducers, applyMiddleware(...middleware));

// todo: remove
console.log('** store.getState()', store.getState());
setInterval(() => {
  console.log('** store.getState()', store.getState());
}, 10000);

export default store;
export let dispatch = store.dispatch;
