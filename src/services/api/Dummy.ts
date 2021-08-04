import { AxiosPromise } from 'axios';
import { api } from '..';



export const ServiceApiDummy = {
  get: (): AxiosPromise<ApiSegChecker> => {
    return api.get('https://seg.stage.mj.gov.br/api');
  },
};
