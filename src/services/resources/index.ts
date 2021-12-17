import { createApi, isApiError } from './api';
import {
  createRealtimeConnection,
  RealtimeConnection,
  RealtimeConnectionStatus,
} from './realtime';

const baseURL = process.env.REACT_APP_SERVER_API ?? '';

const api = createApi({
  baseURL,
});

export type { RealtimeConnection, RealtimeConnectionStatus };
export { api, isApiError, createRealtimeConnection };
