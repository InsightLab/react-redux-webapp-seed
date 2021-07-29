import { spreadById, replaceById, removeById } from '../util';

export function isSagaState<T>(
  state: ReduxState<T>
): state is ReduxSagaState<T> {
  return 'data' in state;
}

export function isArrayState<T, U>(
  state: ReduxState<T>
): state is ReduxArrayState<T, U> {
  return isSagaState(state) && state.data instanceof Array;
}

export const ReduxSagaReducers = {
  arrayAdd<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (isArrayState(state) && state.data) {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }

    throw new Error();
  },

  arrayUpdate<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (isArrayState(state) && action.payload && state.data)
      return {
        ...state,
        data: spreadById(state.data, action.payload),
      };

    throw new Error();
  },

  arrayReplace<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (isArrayState(state) && action.payload && state.data)
      return {
        ...state,
        data: replaceById(state.data, action.payload),
      };

    throw new Error();
  },

  arrayRemove<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (isArrayState(state) && action.payload && state.data)
      return {
        ...state,
        data: removeById(
          state.data,
          action.payload,
          ({ id }: { id: number }) =>
            ({ id: itemId }: { id: number }) =>
              id === itemId
        ),
      };

    throw new Error();
  },

  arrayClear<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (isArrayState(state) && state.data)
      return {
        ...state,
        data: [],
      };

    throw new Error();
  },

  objectUpdate<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (isSagaState(state))
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    throw new Error();
  },

  objectClear<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (isSagaState(state))
      return {
        ...state,
        data: {},
      };

    throw new Error();
  },

  replace<State, Payload>(
    state: ReduxState<State>,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (action.payload) {
      return {
        ...state,
        data: action.payload,
      };
    }

    return state;
  },

  clear<State, Payload>(
    state: ReduxState<State> | undefined,
    action: ReduxAction<Payload>
  ): ReduxState<State> {
    if (isSagaState(state))
      return {
        ...state,
        data: {},
      };

    throw new Error();
  },
};
