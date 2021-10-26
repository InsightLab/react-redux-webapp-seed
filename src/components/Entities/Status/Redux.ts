import { createSaga } from '../../../redux-providers';
import { services } from '../../../services';

type StatusState = ApiStatus | {};

const statusInitialState = {
  loading: false,
  data: {},
  error: null,
};

const getApiStatus = createSaga<StatusState, {}>(
  'status.getStatus',
  services.status.getStatus,
  statusInitialState
);

export const getStatusActionCreator = getApiStatus.actionCreator;
export const getStatusReducer = getApiStatus.reducer;
export const getStatusWatcher = getApiStatus.watcher;
