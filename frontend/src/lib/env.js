// @flow
import chalk from 'chalk';

type TEnv = {
  API_URL: string,
  NODE_ENV: string,
  SHOPIFY_API_KEY: string,
  SHOPIFY_OAUTH_RETURN_URL: string,
};

// Check for missing env vars
let errorMsg = '';

const env: TEnv = {
  // Whatever URL (including port) for the stuff in the 'backend' folder
  API_URL: processVar('REACT_APP_API_URL'),
  NODE_ENV: processVar('NODE_ENV'),
  SHOPIFY_API_KEY: processVar('REACT_APP_SHOPIFY_API_KEY'),
  // todo: just base this off API_URL
  // This is just `${API_URL}/api/oauth`
  SHOPIFY_OAUTH_RETURN_URL: processVar('REACT_APP_SHOPIFY_OAUTH_RETURN_URL'),
};

function processVar(key: string) {
  if (!process.env[key]) {
    console.log(chalk.yellow(`WARNING: ${key} is undefined`));
    errorMsg += `${key}\n`;
    return '';
  }
  return process.env[key];
}

// Add trailing slash to URLS (if they weren't already present) to be more convenient
if (!env.API_URL.endsWith('/')) {
  env.API_URL = env.API_URL + '/';
}

if (errorMsg) throw new Error(`Required env vars missing: \n${errorMsg}`);

export default env;
