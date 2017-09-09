// @flow
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

type TEnv = {
  BACKEND_HTTP_PORT: string,
  CORS_WHITELIST: string,
  MONGODB_URL: string,
  MONGODB_PORT: string,
  MONGODB_DATABASE: string,
  MONGODB_USER: string,
  MONGODB_PASS: string,
  NODE_ENV: string,
  SHOPIFY_URL: string,
  SHOPIFY_API_KEY: string,
  SHOPIFY_API_SECRET_KEY: string,
};

// Check for missing env vars
let hasError = false;

const env: TEnv = {
  BACKEND_HTTP_PORT: processVar('BACKEND_HTTP_PORT'),
  CORS_WHITELIST: processVar('CORS_WHITELIST'),
  MONGODB_URL: processVar('MONGODB_URL'),
  MONGODB_PORT: processVar('MONGODB_PORT'),
  MONGODB_DATABASE: processVar('MONGODB_DATABASE'),
  MONGODB_USER: processVar('MONGODB_USER'),
  MONGODB_PASS: processVar('MONGODB_PASS'),
  NODE_ENV: processVar('NODE_ENV'),
  SHOPIFY_URL: processVar('SHOPIFY_URL'),
  // todo: make sure I still need the API key on the backend
  SHOPIFY_API_KEY: processVar('SHOPIFY_API_KEY'),
  SHOPIFY_API_SECRET_KEY: processVar('SHOPIFY_API_SECRET_KEY'),
};

function processVar(key: string) {
  if (!process.env[key]) {
    console.log(chalk.yellow(`WARNING: ${key} is undefined`));
    hasError = true;
    return '';
  }
  return process.env[key];
}

if (hasError) throw new Error('Required env vars above missing');

export default env;
