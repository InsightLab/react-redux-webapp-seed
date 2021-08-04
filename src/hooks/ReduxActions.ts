import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

export function useActionCreator<Payload>(
  actionCreator: ReduxSimpleActionCreator<Payload>
): (...payload: Payload[]) => ReduxAction<Payload>;

export function useActionCreator<Payload, Result>(
  actionCreator: ReduxDispatchActionCreator<Payload, Result>
): (...payload: Payload[]) => Promise<Result>;

export function useActionCreator<Payload, Result>(
  actionCreator: ReduxActionCreator<Payload, Result>
): (...payload: Payload[]) => ReduxAction<Payload> | Promise<Result> {
  const dispatch = useDispatch<Dispatch<ReduxAction<Payload>>>();
  return useCallback(
    (...payload: Payload[]) => {
      const action = actionCreator(...payload);
      switch (typeof action) {
        case 'function':
          return action(dispatch);
        default:
          return dispatch(action);
      }
    },
    [dispatch, actionCreator]
  );
}

export function useKeyedActionCreator<Payload>(
  key: string,
  actionCreator: ReduxSimpleActionCreator<Payload>
): (...payload: Payload[]) => ReduxAction<Payload>;

export function useKeyedActionCreator<Payload, Result>(
  key: string,
  actionCreator: ReduxDispatchActionCreator<Payload, Result>
): (...payload: Payload[]) => Promise<Result>;

export function useKeyedActionCreator<Payload, Result>(
  key: string,
  actionCreator: ReduxActionCreator<Payload, Result>
): (...payload: Payload[]) => ReduxAction<Payload> | Promise<Result> {
  const dispatch = useDispatch<Dispatch<ReduxAction<Payload>>>();
  return useCallback(
    (payload: Payload) => {
      const action = actionCreator(payload);
      switch (typeof action) {
        case 'function':
          return action((a) => dispatch({ ...a, key }));
        default:
          return dispatch({ ...action, key });
      }
    },
    [dispatch, key, actionCreator]
  );
}

export function useDelayedKeyedActionCreator<Payload>(
  actionCreator: ReduxSimpleActionCreator<Payload>
): (key: string) => (...payload: Payload[]) => ReduxAction<Payload>;

export function useDelayedKeyedActionCreator<Payload, Result>(
  actionCreator: ReduxDispatchActionCreator<Payload, Result>
): (key: string) => (...payload: Payload[]) => Promise<Result>;

export function useDelayedKeyedActionCreator<Payload, Result>(
  actionCreator: ReduxActionCreator<Payload, Result>
): (
  key: string
) => (...payload: Payload[]) => ReduxAction<Payload> | Promise<Result> {
  const dispatch = useDispatch<Dispatch<ReduxAction<Payload>>>();
  return useCallback(
    (key: string) => (payload: Payload) => {
      const action = actionCreator(payload);
      switch (typeof action) {
        case 'function':
          return action((a) => dispatch({ ...a, key }));
        default:
          return dispatch({ ...action, key });
      }
    },
    [dispatch, actionCreator]
  );
}
