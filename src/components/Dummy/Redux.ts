import { createSaga } from '../../redux-providers/SagaUtils';
import { ReduxReducersUtils } from '../../redux-providers/ReducersUtils';
import { services } from '../../services';

const dummyInitialState: ReduxState<ApiDummySample> = {
  loading: false,
  data: {},
  error: null,
};

const getApiStatus = createSaga(
  'dummy.getSample',
  services.dummy.getSample,
  dummyInitialState
);
export const getSample = getApiStatus.actionCreator;
export const getSampleReducer = ReduxReducersUtils.compose<
  ApiDummySample,
  ApiDummySample
>(getApiStatus.reducer);
export const getSampleWatcher = getApiStatus.watcher;
