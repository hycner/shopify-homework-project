// @flow
import type {TSetAccountsAction} from './accounts';
import type {TGetProductsAction} from './products';

export type TAction = TSetAccountsAction | TGetProductsAction;

// actions/accounts
export const SET_ACCOUNTS = 'SET_ACCOUNTS';

// actions/products
export const GET_PRODUCTS_PENDING = 'GET_PRODUCTS_PENDING';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
