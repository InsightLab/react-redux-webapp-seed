import { ServiceApiDummy } from '../../services/api/Dummy';

import { createSaga } from '../../redux-providers/SagaUtils';
import { ReduxReducersUtils } from '../../redux-providers/ReducersUtils';

const dummyInitialState: ReduxState<ApiSegChecker> = {
  loading: false,
  data: {},
  error: null,
};

const getApiStatus = createSaga(
  'getSegStatus',
  ServiceApiDummy.get,
  dummyInitialState
);
export const getSegStatus = getApiStatus.actionCreator;
export const getSegStatusReducer = ReduxReducersUtils.compose<
  ApiSegChecker,
  ApiSegChecker
>(getApiStatus.reducer);
export const getSegStatusWatcher = getApiStatus.watcher;
