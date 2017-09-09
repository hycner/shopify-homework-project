import React from 'react';
import {render} from 'react-dom';

import App from './app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});
