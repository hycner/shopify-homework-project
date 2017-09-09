// @flow
import type {TAction} from '../actions/_actionTypes';
import type {TProduct} from '../../../types/index';

import {GET_PRODUCTS_SUCCESS} from '../actions/_actionTypes';

export type TStateProducts = {
  [key: string]: Array<TProduct>,
};

const initialState: TStateProducts = {};

export default (state: TStateProducts = initialState, action: TAction): TStateProducts => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      let newState = {...state};

      newState[action.payload.accountId] = action.payload.products;

      return newState;
    default:
      return state;
  }
};
