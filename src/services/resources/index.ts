import { createApi } from './util';
import { AxiosError, AxiosResponse } from 'axios';

const baseURL = process.env.REACT_APP_SERVER_API ?? ``;

const api = createApi({
  baseURL,
  getDataOnSuccess: <T>(response: AxiosResponse<T>) => response.data,
  getMessageOnError: (error: AxiosError<SagaError>) =>
    error.response?.data?.message ?? `Ops!`,
  headers: {},
});

// extensions of api

/* api.setAuth = (token) => {
  // attach authorization data to sebsequent requests
  api.defaults.headers.common['Authorization'] = token;
}; */

export { api };
