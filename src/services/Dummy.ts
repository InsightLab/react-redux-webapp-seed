import { api, isApiError } from './resources';

export const getSample = () => {
  return api.get<ApiDummySample>(`data/sample.json`);
};

// demonstração de tratamento promise
export const getSampleInDebug = () => {
  return api
    .get<ApiDummySample>(`data/sample.json`)
    .then((data) => {
      console.log(`services.dummy.getSample ~ Success:`, data);
      return data;
    })
    .catch((err: Error | ApiError) => {
      if (isApiError(err)) {
        console.log(`services.dummy.getSample ~ API Error:`, err);
      } else {
        console.log(`services.dummy.getSample ~ Error:`, err);
      }
      return Promise.reject(err);
    });
};
