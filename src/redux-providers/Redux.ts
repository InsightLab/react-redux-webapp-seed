import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

// reducers
const reducers = combineReducers({
  // adding reducers
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// combining both reducers and sagas in a store
export const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware, thunk));

// run the saga
//sagaMiddleware.run(loginWatcher);
