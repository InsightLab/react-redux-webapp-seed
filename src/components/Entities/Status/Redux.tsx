import { createSlice } from '@reduxjs/toolkit';
import { composeReducers, createSaga } from '../../../redux-providers';
import { services } from '../../../services';

type StatusState = ApiStatus | {};

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const getApiStatus = createSaga<StatusState, {}>({
  name: 'status.getStatus',
  initialState,
  asyncTask: services.status.getStatus,
});

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    clear() {
      return initialState;
    },
  },
});

export const getStatusActionCreator = getApiStatus.actionCreator;
export const clearStatusActionCreator = statusSlice.actions.clear;

export const reducer = composeReducers(
  initialState,
  getApiStatus.reducer,
  statusSlice.reducer
);

export const watcher = getApiStatus.watcher;
