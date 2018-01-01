// @flow
import uuidV1 from 'uuid/v1';

import Accounts from '../models/accounts';
import env from "../lib/env";
import request from "superagent";

export function getAccount(accountName: string): Promise<Object> {
  return new Promise((res, rej) => {
    Accounts.findOne({name: accountName}, (err, account) => {
      if (err) {
        console.log(`Error searching for account '${accountName}'. Error: `, err);
        return rej(err);
      }
      res(account);
    });
  });
}

type TGetAllAccountsReturn = Promise<Array<Object> | string>;
export function getAllAccounts(): TGetAllAccountsReturn {
  return new Promise((res, rej) => {
    Accounts.find((err, accounts) => {
      if (err) {
        console.log('Error getting all accounts. Error: ', err);
        return rej(err);
      }
      res(accounts);
    });
  });
}

export function createAccount(accountName: string): Promise<Object> {
  return new Promise((res, rej) => {
    Accounts.create(
      {
        name: accountName,
        oauthSecret: uuidV1(),
      },
      function(err, account) {
        if (err) {
          console.log(`Error creating account '${accountName}'. Error: `, err);
          return rej(err);
        }
        res(account);
      }
    );
  });
}

export function updateAccount(id: string, fields: Object): Promise<?string> {
  return new Promise((res, rej) => {
    Accounts.update(
      {_id: id},
      {$set: fields},
      function(err) {
        if (err) {
          console.log(`Error updating account id '${id}'. Error: `, err);
          return rej(err);
        }
        res();
      }
    );
  });
}

export function createShopifyToken(code: string, shop: string): Promise<string> {
  return new Promise((res, rej) => {
    request.post(`https://${shop}/admin/oauth/access_token`)
      .send({
        client_id: env.SHOPIFY_API_KEY,
        client_secret: env.SHOPIFY_API_SECRET_KEY,
        code,
      })
      .then((result) => {
        console.log('** result', JSON.stringify(result));

        res(result.access_token);
      })
      .catch((err) => {
        console.log('Error creating shopify token:', err);
        rej(err.error.error_description);
      });
  });
}
