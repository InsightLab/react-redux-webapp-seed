import createSagaMiddleware from '@redux-saga/core';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { getSampleReducer, getSampleWatcher } from '../components/Dummy/Redux';

const reducer = combineReducers({
  status: getSampleReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunk];

export const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(getSampleWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = typeof store.dispatch;
