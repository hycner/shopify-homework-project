// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import 'antd/dist/antd.css';

import store, {history} from './store';
import App from './components/app';
import './index.css';

let roomComponent = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
let rootElement = document.getElementById('root');

ReactDOM.render(roomComponent, rootElement);
