import createSagaMiddleware from '@redux-saga/core';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import * as status from '../components/Pages/Status/Redux';

const reducer = combineReducers({
  status: status.reducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];

export const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(status.watcher);

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
