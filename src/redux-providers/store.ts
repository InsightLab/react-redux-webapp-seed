import createSagaMiddleware from '@redux-saga/core';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
  getStatusReducer,
  getStatusWatcher,
} from '../components/Entities/Status/Redux';

const reducer = combineReducers({
  status: getStatusReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];

export const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(getStatusWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
