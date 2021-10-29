import { Reducer, useCallback, useMemo, useReducer } from 'react';
import { useIsMounted } from 'usehooks-ts';

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
  const wrappedInitialState: ResultState<State> = {
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
          ...wrappedInitialState,
          loading: true,
        };
      case 'resolve':
        return {
          ...wrappedInitialState,
          loading: false,
          data: action.payload,
        };
      case 'reject':
        return {
          ...wrappedInitialState,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, wrappedInitialState);
  const isMounted = useIsMounted();

  const safeDispatch = useCallback(
    (action: Action<State>) => isMounted() && dispatch(action),
    [isMounted, dispatch]
  );

  const asyncTask = useCallback(
    (...params: Args[]) => {
      safeDispatch({ type: 'run' });
      request(...params)
        .then((result) => {
          safeDispatch({ type: 'resolve', payload: result });
        })
        .catch((error) => {
          safeDispatch({ type: 'reject', payload: error });
        });
    },
    [request, safeDispatch]
  );

  return useMemo(() => ({ state, asyncTask }), [state, asyncTask]);
}
