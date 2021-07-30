import axios, { AxiosError, AxiosResponse } from 'axios';
import { httpErrorHandler } from './api/errorHandler';

type AxiosApi = {
  baseURL: string;
  getDataOnSuccess: <T>(t: AxiosResponse<T>) => T;
  getMessageOnError: <T>(error: AxiosError<T>) => string;
  headers: object;
};

export const createApi = ({
  baseURL,
  getDataOnSuccess,
  getMessageOnError,
  headers = {},
}: AxiosApi) => {
  // api declaration

  const api = axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
  });

  // interceptors

  api.interceptors.request.use(
    // update config before request
    (config) => config,
    // handle request error
    (error) => handleError(error)
  );

  api.interceptors.response.use(
    // do something with response
    (response) => mapResponseToUsefulData(response),
    // handle response error
    (error) => handleError(error)
  );

  // utility

  const handleError = <T>(error: AxiosError<T>) => {
    // log
    console.error(error);
    // handle http erros
    httpErrorHandler(error);
    // extract in useful error format
    const usefulError = mapToUsefulError(error);
    // return as promise rejected
    return Promise.reject(usefulError);
  };

  const mapResponseToUsefulData = <T>(response: AxiosResponse<T>) => {
    return getDataOnSuccess(response);
  };

  const mapToUsefulError = <T>(error: AxiosError<T>) => {
    // try get from body
    const messageFromBody = getMessageOnError(error);
    if (messageFromBody) return { message: messageFromBody, error };
    // try get exception
    const messageFromError = error && error.message;
    if (messageFromError) return { message: messageFromError, error };
    // otherwise, return error
    return { message: error, error };
  };

  // return api
  return api;
};
