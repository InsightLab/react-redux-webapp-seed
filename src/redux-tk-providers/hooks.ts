import { useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { TypedDispatch, RootState } from './store';

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAsyncActionCreator<Args, Result>(
  actionCreator: AsyncActionCreator<Args, Result>
): (...args: Args[]) => Promise<Result> {
  const dispatch = useTypedDispatch();

  return useCallback(
    (...args: Args[]) => {
      const action = actionCreator(...args);

      return action(dispatch);
    },
    [dispatch, actionCreator]
  );
}

export function useActionCreator<Args>(action: (...args: Args[]) => AnyAction) {
  const dispatch = useTypedDispatch();

  return useCallback(
    (...args: Args[]) => {
      return dispatch(action(...args));
    },
    [dispatch, action]
  );
}
