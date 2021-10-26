import { createSaga } from '../../redux-providers';
import { services } from '../../services';

type StatusState = ApiDummySample | {};

const dummyInitialState = {
  loading: false,
  data: {},
  error: null,
};

const getApiStatus = createSaga<StatusState, {}>(
  'dummy.getSample',
  services.dummy.getSample,
  dummyInitialState
);

export const getSample = getApiStatus.actionCreator;
export const getSampleReducer = getApiStatus.reducer;
export const getSampleWatcher = getApiStatus.watcher;
