import { createApi, isApiError } from './api';

const baseURL = process.env.REACT_APP_SERVER_API ?? '';

const api = createApi({
  baseURL,
});

export { api, isApiError };
