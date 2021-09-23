import { AxiosPromise } from 'axios';
import { api } from './resources';

export const getSample = (): AxiosPromise<ApiDummySample> => {
  return api.get(`data/sample.json`);
};
