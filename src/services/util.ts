import axios from 'axios';
import { publish } from '../EventBus';
import { httpErrorHandler } from './errorHandler';
import { requiredArg, limbo, identity } from '../../util';

type AxiosApi = {
  baseURL: string;
  getDataOnSuccess: () => void;
  getMessageOnError: () => void;
  headers: object;
};

export const createApi = ({
  baseURL = requiredArg('baseUrl'),
  getDataOnSuccess = identity,
  getMessageOnError = limbo,
  headers = {},
}) => {
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

  const handleError = (error) => {
    // log
    console.error(error);
    // handle http erros
    httpErrorHandler(error);
    // extract in useful error format
    const usefulError = mapToUsefulError(error);
    // publish error event
    publish('error', usefulError);
    // return as promise rejected
    return Promise.reject(usefulError);
  };

  const mapResponseToUsefulData = (response) => {
    return getDataOnSuccess(response);
  };

  const mapToUsefulError = (error) => {
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
