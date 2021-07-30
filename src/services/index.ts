import { path } from 'ramda';
import { createApi } from './util';
import env from '../env';
import { AxiosError, AxiosResponse } from 'axios';

const api = createApi({
  baseURL: "",
  getDataOnSuccess: <T>(response: AxiosResponse<T>) => response.data,
  getMessageOnError: (error: AxiosError<SagaError>) => path(['response', 'data', 'message'], error),
  headers : {}
});

// extensions of api

/* api.setAuth = (token) => {
  // attach authorization data to sebsequent requests
  api.defaults.headers.common['Authorization'] = token;
}; */

export { api };
