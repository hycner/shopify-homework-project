// @flow
import to from 'await-to-js';

import type {Request, Response, NextFunction} from 'express';
import type {TAccount, TProduct} from '../../../../types';

import {createAccount, getAccount} from '../../services/accounts';
import {fetchProducts, updateProducts} from '../../services/products';

export default async (req: Request, res: Response, next: NextFunction) => {
  let err;
  let accountName = req.body.accountName.toLowerCase();
  console.log('accountName: ', accountName);

  // See if account already exists
  let account: TAccount;
  [err, account] = await to(getAccount(accountName));
  if (err) return res.status(400).json({error: true});

  if (account) {
    if (!account.shopifyKey) {
      // If oauth isn't finished, send secret for redirect
      res.status(200).json({oauthSecret: account.oauthSecret});
    } else {
      // todo: see if this works
      // If oauth is done, migrate products
      let products: Array<TProduct>;
      [err, products] = await to(fetchProducts(account.name, account.shopifyKey));
      if (err) return res.status(400).json({error: true});

      [err] = await to(updateProducts(account.name, products));
      if (err) return res.status(400).json({error: true});

      res.status(400).json({success: true});
    }
  } else {
    // Create account
    let newAccount: TAccount;
    [err, newAccount] = await to(createAccount(accountName));
    if (err) return res.status(400).json({error: true});

    // Send secret for redirect
    res.status(200).json({
      oauthSecret: newAccount.oauthSecret,
    });
  }
};
