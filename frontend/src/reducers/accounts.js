// @flow
import type {TAction} from '../actions/_actionTypes';
import type {TAccount} from '../../../types/index';

import {SET_ACCOUNTS} from '../actions/_actionTypes';

export type TStateAccounts = Array<TAccount>;

const initialState: TStateAccounts = [];

export default (state: TStateAccounts = initialState, action: TAction): TStateAccounts => {
  switch (action.type) {
    case SET_ACCOUNTS:
      return action.payload;
    default:
      return state;
  }
};
