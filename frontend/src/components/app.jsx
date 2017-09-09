// @flow
import React from 'react';
import {Route} from 'react-router';

import Import from './app/import';
import Display from './app/display';
import Nav from './app/nav';
import './app.css';

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Route exact path="/" component={Import} />
      <Route path="/display" component={Display} />
    </div>
  );
}
