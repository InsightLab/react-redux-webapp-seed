import axios, { AxiosInstance, AxiosError, Method } from 'axios';

const HEADER_AUTH = `Authorization`;

interface ApiParams {
  baseURL: string;
  headers?: any;
}

interface ApiInstance {
  baseURL: string;
  setAuthToken: (token: string | null) => void; // attach/detach authorization header to subsequent requests
  getAuthToken: () => string | null;
  on: (eventType: 'error', callback: (error: ApiError) => void) => void; // catch global http/axios errors
  get: <T = any>(url: string, config?: any) => Promise<T>;
  delete: <T = any>(url: string, config?: any) => Promise<T>;
  options: <T = any>(url: string, config?: any) => Promise<T>;
  put: <T = any>(url: string, data?: any, config?: any) => Promise<T>;
  post: <T = any>(url: string, data?: any, config?: any) => Promise<T>;
  patch: <T = any>(url: string, data?: any, config?: any) => Promise<T>;
}

const convertError = (error: AxiosError): ApiError => {
  if (!error.response) {
    throw new Error(`Conversion requires response property!`);
  }
  const { config, response } = error;
  return {
    isApiError: true,
    url: error.config.url || '',
    method: config.method || '',
    query: error.config.paramsSerializer,
    config: {
      headers: error.config.headers,
      data: error.config.data,
    },
    status: response.status,
    headers: response.headers,
    data: response.data,
  };
};

const createAxiosInstance = (baseURL: string, headers: any) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json',
      ...headers,
    },
  });
  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (axios.isAxiosError(error)) {
        return Promise.reject(convertError(error));
      }
      return error;
    }
  );
  return axiosInstance;
};

const createAxiosRequest = (axiosInstance: AxiosInstance) => {
  return async <T>(
    method: Method,
    url: string,
    data?: any,
    config?: any
  ): Promise<T> => {
    const options = { ...config, method, url, data };
    const resp = await axiosInstance.request<T>(options);
    return resp.data;
  };
};

const createSetAuthToken = (axiosInstance: AxiosInstance) => {
  return (token: string | null) => {
    if (token === null) {
      delete axiosInstance.defaults.headers.common[HEADER_AUTH];
    } else {
      axiosInstance.defaults.headers.common[HEADER_AUTH] = token;
    }
  };
};

const createGetAuthToken = (
  axiosInstance: AxiosInstance
): (() => string | null) => {
  return () => {
    const authToken: string =
      axiosInstance.defaults.headers.common[HEADER_AUTH] || ``;
    return authToken ? authToken : null;
  };
};

const createEventListener = (axiosInstance: AxiosInstance) => {
  return (eventType: 'error', callback: (error: ApiError) => void) => {
    axiosInstance.interceptors.response.use(
      (resp) => resp,
      (error: Error | ApiError) => {
        if (eventType === `error`) {
          if ('isApiError' in error) {
            callback(error);
          }
        }
        return Promise.reject(error);
      }
    );
  };
};

export const isApiError = (error: any): error is ApiError => {
  return 'isApiError' in error;
};

export function createApi({ baseURL, headers }: ApiParams): ApiInstance {
  const axiosInstance = createAxiosInstance(baseURL, headers);
  const setAuthToken = createSetAuthToken(axiosInstance);
  const getAuthToken = createGetAuthToken(axiosInstance);
  const request = createAxiosRequest(axiosInstance);
  const on = createEventListener(axiosInstance);

  return {
    baseURL,
    setAuthToken,
    getAuthToken,
    on,
    get: <T>(url: string, config?: any) => request<T>('get', url, null, config),
    delete: <T>(url: string, config?: any) =>
      request<T>('delete', url, null, config),
    options: <T>(url: string, config?: any) =>
      request<T>('options', url, null, config),
    post: <T>(url: string, data?: any, config?: any) =>
      request<T>('post', url, data, config),
    put: <T>(url: string, data?: any, config?: any) =>
      request<T>('put', url, data, config),
    patch: <T>(url: string, data?: any, config?: any) =>
      request<T>('patch', url, data, config),
  };
}
