import { AxiosPromise } from 'axios';
import { api } from '..';

export const ServiceApiDummy = {
  get: (): AxiosPromise<ApiSegChecker> => {
    return api.get('/data/sample.json');
  },
};
