// @flow
import type {TAccount} from '../../../types/index';

import {SET_ACCOUNTS} from './_actionTypes';

export type TSetAccountsAction = {
  type: 'SET_ACCOUNTS',
  payload: Array<TAccount>,
};

export function setAccounts(accounts: Array<TAccount>): TSetAccountsAction {
  return {
    type: SET_ACCOUNTS,
    payload: accounts,
  };
}
