// @flow
import crypto from 'crypto';
import querystring from 'querystring';

import type {Request, Response, NextFunction} from 'express';
import type {TAccount} from '../../../../types';

import {createShopifyToken, getAccount, updateAccount} from '../../services/accounts';
import to from "await-to-js";

type TQuery = {
  code: string,
  hmac: string,
  shop: string,
  state: string,
  timestamp: string,
};

// todo: remove this
// DEMO VALUES FROM DOCS
// {
//   "code": "0907a61c0c8d55e99db179b68161bc00",
//   "hmac": "4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20",
//   "shop": "some-shop.myshopify.com",
//   "timestamp": "1337178173"
// }

export default async (req: Request, res: Response, next: NextFunction) => {
  let err;
  let query: TQuery = req.query;
  console.log('** query: ', query);

  // todo: revise this with gprc or joi to validate incoming query
  if (!query.shop && !query.hmac && !query.code && !query.state) {
    return res.status(400).json({error: 'Shopify return payload malformed'});
  }

  // todo: fix issue with hmac validation
  // Validate hmac
  // let joinedFields = querystring.stringify({
  //   code: query.code,
  //   shop: query.shop,
  //   timestamp: query.timestamp,
  // });
  // const hash = crypto.createHmac('sha256', query.state)
  //   .update(joinedFields)
  //   .digest('hex');
  // console.log(`** shopify's hmac: ${query.hmac}`);
  // console.log(`**        my hmac: ${hash}`);
  // if (query.hmac !== hash) {
  //   return res.status(400).json({error: 'HMAC validation failed'});
  // }

  // Get account
  let accountName = query.shop.split('.')[0];
  let account: TAccount;
  [err, account] = await to(getAccount(accountName));
  if (err) return res.status(400).json({error: 'Account not found'});

  // todo: remove
  console.log('** account:', JSON.stringify(account));

  // Compare secrets
  if (account.oauthSecret !== query.state) {
    return res.status(400).json({error: 'Secrets do not match'});
  }

  // Get shopify token for shop
  let shopifyToken;
  [err, shopifyToken] = await to(createShopifyToken(query.code, query.shop));
  if (err) return res.status(400).json({error: err});

  // todo: remove
  console.log('** shopifyToken:', shopifyToken);

  // Update account with token
  [err] = await to(updateAccount(account._id, {shopifyKey: shopifyToken}));
  if (err) return res.status(400).json({error: err});

  // todo: remove
  console.log('** account updated!');

  res.status(200).json(query);
};
