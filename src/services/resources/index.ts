import { createApi, isApiError } from './api';
import { createRealtimeConnection } from './realtime';

const baseURL = process.env.REACT_APP_SERVER_API ?? '';

const api = createApi({
  baseURL,
});

export { api, isApiError, createRealtimeConnection };
