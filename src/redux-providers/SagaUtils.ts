import { AxiosPromise } from 'axios';
import { all } from 'redux-saga/effects';
import { invoke } from '../util';
import { defaultInitialState, SagaController } from './SagaController';

export const ReduxSagaUtils = {
  /**
   * Compose all sagas in one sigle sagas.
   * @param {Generator} sagas Sagas to be combined.
   */
  compose<T>(...sagas: SagaWatcher<T>[]) {
    return function* () {
      yield all(sagas.map(invoke));
    };
  },
};

export function createSaga<T, Params, Result>(
  name: string,
  asyncTask: (params: Params) => AxiosPromise<Result>,
  initialState?: ReduxState<T>
) {
  const sagaController = new SagaController<T, Params, Result>({
    saga: name,
    asyncTask: asyncTask,
    initialState: initialState || defaultInitialState,
  });

  return {
    actionCreator: sagaController.actionCreator,
    reducer: sagaController.reducer,
    watcher: sagaController.watcher,
    saga: sagaController.saga,
  };
}
