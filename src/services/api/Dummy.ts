import axios, { AxiosPromise } from 'axios';

export const ServiceApiDummy = {
  get: (): AxiosPromise<ApiSegChecker> => {
    return axios.get("https://seg.stage.mj.gov.br/api");
  }
}