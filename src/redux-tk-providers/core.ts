import { call, put, takeEvery } from '@redux-saga/core/effects';
import { createSlice } from '@reduxjs/toolkit';
import { TypedDispatch } from './store';

export function createSaga<State, Args>(
  name: string,
  asyncTask: AsyncTask<Args, State>,
  initialState: SimpleSagaState<State>,
  options: SagaOptions = {}
) {
  const takeFn = options?.takeFn || takeEvery;

  const sagaSlice = createSlice({
    name,
    initialState,
    reducers: {
      run() {
        return {
          ...initialState,
          loading: true,
        };
      },
      resolve(_, action) {
        return {
          ...initialState,
          data: action.payload,
          loading: false,
        };
      },
      reject(_, action) {
        return {
          ...initialState,
          error: action.payload,
          loading: false,
        };
      },
    },
  });

  function* worker(action: RunAction<Args, State>) {
    const { payload, resolve, reject } = action;

    try {
      const result: State = yield call(asyncTask, payload);
      resolve && resolve(result);
      yield put(sagaSlice.actions.resolve(result));
    } catch (error) {
      reject && reject(error);
      yield put(sagaSlice.actions.reject(error));
    }
  }

  const reducer = sagaSlice.reducer;

  function* watcher() {
    yield takeFn(sagaSlice.actions.run.type, worker);
  }

  function actionCreator(...payload: Args[]) {
    return async (dispatch: TypedDispatch) =>
      new Promise((resolve: (r: State) => void, reject: (e: Error) => void) => {
        dispatch({
          type: sagaSlice.actions.run.type,
          payload,
          resolve,
          reject,
        });
      });
  }

  return {
    actionCreator,
    reducer,
    watcher,
  };
}