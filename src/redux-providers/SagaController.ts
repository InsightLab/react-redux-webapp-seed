import { AxiosPromise } from 'axios';
import { Dispatch } from 'redux';
import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { ReduxReducersUtils } from './ReducersUtils';

export const defaultInitialState = {
  loading: false,
  error: null,
  data: {},
};

/**
 * Reduces the worker of create saga, actions and reducers
 * related to loading and sending of data to async tasks.
 *
 * SagaController's instances takes few specifications and provider:
 * - saga watcher.
 * - saga worker.
 * - redux reducer.
 * - action creator.
 *
 * The specifications are:
 * - asyncTask: method that returns a promise.
 * - saga: identifier of saga, like 'login', 'submition', 'fetchUsers', etc.
 * - initialState: (optional) initial state of reducer related to this saga.
 * - take: 'every' or 'latest'
 *
 */
class SagaController<State, Params, Result> {
  asyncTask: (params: Params) => AxiosPromise<Result>;
  saga: string;
  options: ReduxOptions<State>;

  constructor({
    asyncTask,
    saga,
    ...options
  }: SagaControllerConstructor<State, Params, Result>) {
    // asyncTask: function that returns an promise.
    this.asyncTask = asyncTask;
    // saga: saga identifier.
    this.saga = saga;
    // options: optional additional (maybe uneed) options.
    // possible options: initial state
    this.options = options;
  }

  get reducer() {
    // defining reducers
    const reducers: ReduxReducersCollection = {
      // reducer for <saga>:run action
      [this.RUN]: SagaController.reducerRun,
      // reducer for <saga>:resolve action
      [this.RESOLVE]: SagaController.reducerResolve,
      // reducer for <saga>:reject action
      [this.REJECT]: SagaController.reducerReject,
    };
    const initialState = this.options.initialState || defaultInitialState;
    return ReduxReducersUtils.object({ initialState }, reducers);
  }

  takeFunction(str: string) {
    switch (str) {
      case 'every':
        return takeEvery;
      default:
        return takeLatest;
    }
  }

  get watcher() {
    const RUN = this.RUN;
    const worker = this.worker;
    const { take = 'latest' } = this.options;

    // getting take function
    const takeFn = this.takeFunction(take);

    // returns an saga watcher
    return function* () {
      yield takeFn(RUN, worker);
    };
  }

  get worker() {
    const asyncTask = this.asyncTask;
    const RESOLVE = this.RESOLVE;
    const REJECT = this.REJECT;

    return function* (action: ReduxRunAction<Params>): SagaGenerator<State> {
      // returns an saga worker
      const { type, payload, resolve, reject } = action;

      try {
        const result = yield call(asyncTask, payload);
        // if ok, resolve the promise
        resolve && resolve(result);
        // and yield saga resolve action
        yield put({ type: RESOLVE, payload: result });
      } catch (exception) {
        // if error, resolve the promise
        reject && reject(exception);
        // and yield saga reject action
        yield put({ type: REJECT, payload: exception });
      }
    };
  }

  actionCreator = <Payload>(payload?: Payload) => {
    // returning a function to thunk
    return (dispatch: Dispatch<ReduxAction<Payload>>) => {
      // The return of action creator will be a promise
      // This promises will be resolved in the feature
      // when saga concludes the work.
      return new Promise(
        (resolve: (_: State) => void, reject: (_: SagaError) => void) => {
          dispatch({
            type: this.RUN,
            payload,
            // besides payload and type
            // this action includes resolve and reject functions
            // this functions will be trigger the promises' resolve
            resolve,
            reject,
          });
        }
      );
    };
  };

  // actions types

  get RUN() {
    return `${this.saga}:run`;
  }

  get RESOLVE() {
    return `${this.saga}:resolve`;
  }

  get REJECT() {
    return `${this.saga}:reject`;
  }

  // static helpers

  static reducerRun<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    const realState = state ? state : defaultInitialState;
    return {
      ...realState,
      loading: true,
      error: null,
    };
  }

  static reducerResolve<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    const realState = state ? state : defaultInitialState;
    if (action.payload) {
      return {
        ...realState,
        loading: false,
        error: null,
        data: action.payload,
      };
    }

    return realState;
  }

  static reducerReject<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    const realState = state ? state : defaultInitialState;
    if (action.payload) {
      return {
        ...realState,
        loading: false,
        error: action.payload as unknown as SagaError,
      };
    }

    return realState;
  }
}

export { SagaController };
