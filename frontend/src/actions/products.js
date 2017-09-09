// @flow
import type {TProduct, TDispatch, TGetState} from '../../../types/index';

import env from '../lib/env';
import request from '../lib/request';
import {GET_PRODUCTS_PENDING} from './_actionTypes';

export type TGetProductsAction = {
  type: 'GET_PRODUCTS_PENDING',
  payload: {
    accountId: number,
    products: Array<TProduct>,
  },
};

export function getProducts(accountName: string) {
  return (dispatch: TDispatch, getState: TGetState) => {
    dispatch({
      type: GET_PRODUCTS_PENDING,
    });

    let state = getState();

    request
      .post('api/migrate', {accountName})
      .then(res => {
        console.log('outer res:', res);
        if (res.oauthSecret) {
          redirect(accountName, res.oauthSecret);
        } else if (res.success) {
          // todo: figure out if "success" is the best indicator.
          // todo: redirect to display page for this accountName after.
        }
      })
      .catch(err => console.log('outer err', err));
  };
}

function redirect(accountName: string, oauthSecret: string) {
  let oAuthUrl =
    `https://${accountName}.myshopify.com/admin/oauth/authorize` +
    `?client_id=${env.SHOPIFY_API_KEY}` +
    `&scope=read_products` +
    `&redirect_uri=${encodeURIComponent(env.SHOPIFY_OAUTH_RETURN_URL)}` +
    `&state=${oauthSecret}`;

  console.log(`** oAuthUrl: ${oAuthUrl.slice(8)} !`);
  window.location = oAuthUrl;
}
