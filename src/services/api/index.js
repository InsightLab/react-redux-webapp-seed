import { path } from 'ramda';
import { createApi } from '../util';
import env from '../../env';

const api = createApi({
  baseURL: env.apiBaseUrl,
  getDataOnSuccess: response => response.data,
  getMessageOnError: error => path(['response', 'data', 'message'], error),
  headers: {
    'Accept-Client': env.appKey,
    'Client-Name': env.appInitals,
    'Client-Version': env.version
  }
});

// extensions of api

api.setAuth = token => {
  // attach authorization data to sebsequent requests
  api.defaults.headers.common['Authorization'] = token;
};


export { api };