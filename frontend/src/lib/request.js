// @flow
import env from './env';

let apiRoot = env.API_URL;

export default {
  get: (url: string) => makeRequest(url, 'get'),
  post: (url: string, postData: Object) => makeRequest(url, 'post', postData),
};

function makeRequest(url: string, method: string, postData?: Object): Promise<any> {
  // Remove leading slash if it's present
  if (url.startsWith('/')) {
    url = url.substr(1);
  }
  let apiUrl = apiRoot + url;

  // Config what type of http method
  let config: RequestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  };
  // Add post data if necessary
  if (method === 'post') {
    config.body = JSON.stringify(postData);
  }

  return fetch(apiUrl, config)
    .then(res => {
      return res.json();
    })
    .then(val => val)
    .catch(err => {
      console.log(`Failed to get resource from: ${apiUrl}. Error:`, err);
    });
}
