// @flow
import request from 'superagent';

import type {TProduct} from '../../../types/index';

// todo: see if this works
export function fetchProducts(accountName: string, shopifyKey: string) {
  return new Promise((res, rej) => {
    let url = `https://${accountName}.shopify.com/admin/products.json`;

    request.get(url).set('X-Shopify-Access-Token', shopifyKey).end((err, products) => {
      if (err) {
        console.log('Error getting products: ', err);
        return rej(err);
      }

      console.log('** products', products);
      res(products);
    });
  });
}

// todo: finish this
export function updateProducts(accountName: string, products: Array<TProduct>) {
  return new Promise((res, rej) => {
    console.log('** updateProducts(). products: ', products);
  });
}
