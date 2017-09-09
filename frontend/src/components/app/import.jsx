// @flow
import React from 'react';
import {Input} from 'antd';

import {dispatch} from '../../store';
import {setAccounts} from '../../actions/accounts';
import {getProducts} from '../../actions/products';

import './import.css';

const Search = Input.Search;

export default function Import() {
  return (
    <div className="importWrap">
      <Search placeholder="input account name" className="searchInput" onSearch={getAccounts} />
    </div>
  );
}

// todo: make this right
function getAccounts(value: string) {
  dispatch(setAccounts([{id: '123'}, {id: '456'}, {id: '789'}]));
  dispatch(getProducts(value));
}
