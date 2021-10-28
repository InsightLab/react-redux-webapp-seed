import { Reducer, useCallback, useMemo, useReducer } from 'react';

type ResultState<State> = {
  loading: boolean;
  data: State;
  error?: ApiError;
};

type RunAction = {
  type: 'run';
};

type ResolveAction<State> = {
  type: 'resolve';
  payload: State;
};

type RejectAction = {
  type: 'reject';
  payload: ApiError;
};

type Action<State> = RunAction | ResolveAction<State> | RejectAction;

export function useAsyncRequest<State, Args>(
  request: AsyncTask<Args, State>,
  initialState: State
) {
  const sagaInitialState: ResultState<State> = {
    loading: false,
    data: initialState,
  };

  const reducer: Reducer<ResultState<State>, Action<State>> = (
    state: ResultState<State>,
    action: Action<State>
  ): ResultState<State> => {
    switch (action.type) {
      case 'run':
        return {
          ...sagaInitialState,
          loading: true,
        };
      case 'resolve':
        return {
          ...sagaInitialState,
          loading: false,
          data: action.payload,
        };
      case 'reject':
        return {
          ...sagaInitialState,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, sagaInitialState);

  const asyncTask = useCallback(
    (...params: Args[]) => {
      dispatch({ type: 'run' });
      request(...params)
        .then((result) => {
          dispatch({ type: 'resolve', payload: result });
        })
        .catch((error) => {
          dispatch({ type: 'reject', payload: error });
        });
    },
    [request, dispatch]
  );

  return useMemo(() => ({ state, asyncTask }), [state, asyncTask]);
}
