// @flow
import crypto from 'crypto';

import type {Request, Response, NextFunction} from 'express';
import type {TAccount} from '../../../../types';

import {getAccount} from '../../services/accounts';

type TQuery = {
  code: string,
  hmac: string,
  timestamp: string,
  state: string,
  shop: string,
};

// todo: remove this
// DEMO VALUES FROM DOCS
// {
//   "code": "0907a61c0c8d55e99db179b68161bc00",
//   "hmac": "4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20",
//   "shop": "some-shop.myshopify.com",
//   "timestamp": "1337178173"
// }

// todo: this
export default async (req: Request, res: Response, next: NextFunction) => {
  let query: TQuery = req.query;
  console.log('** query: ', query);

  // Validate hmac
  let joinedFields = `code=${query.code}&shop=${query.shop}&timestamp=${query.timestamp}`;
  const hash = crypto.createHmac('sha256', query.state).update(joinedFields).digest('hex');
  console.log(`** shopify's hmac: ${query.hmac}`);
  console.log(`** my hmac: ${hash}`);
  if (query.hmac !== hash) {
    return res.status(400).json({error: 'HMAC validation failed'});
  }

  // Get account
  let account: TAccount;
  try {
    account = await getAccount(query.shop);
  } catch (e) {
    return console.log(e);
  }

  // Abort if no account
  if (!account) return res.status(400).json({error: 'Account not found'});

  // Compare secrets
  if (account.oauthSecret !== query.state) {
    return console.log("Secrets don't match");
  }

  res.status(200).json(query);
};
