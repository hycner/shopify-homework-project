// @flow
import uuidV1 from 'uuid/v1';

import Accounts from '../models/accounts';

export function getAccount(accountName: string) {
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

export function getAllAccounts() {
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

export function createAccount(accountName: string) {
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

export function updateAccount(id: string, fields: Object) {
  return new Promise((res, rej) => {
    Accounts.update(
      {_id: id},
      // todo: remove old:
      // { $set: { size: 'large' }},
      {$set: fields},
      function(err, something) {
        // todo: make sure this callback fires & works correctly
        if (err) {
          console.log(`Error updating account id '${id}'. Error: `, err);
          return rej(err);
        }
        console.log('is this something?', something);
        console.log(JSON.stringify(something));
        res(something);
      }
    );
  });
}
