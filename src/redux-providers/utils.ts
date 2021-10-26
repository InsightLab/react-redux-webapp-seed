import { AnyAction, Reducer } from 'redux';

export function composeReducers<State>(
  initialState: State,
  ...reducers: Reducer<State>[]
): Reducer<State> {
  const accumulateReducers =
    (action: AnyAction) =>
    (accumulator: State, reducer: Reducer<State>): State =>
      reducer(accumulator, action);

  const composedReducer: Reducer<State> = (state = initialState, action) =>
    reducers.reduce(accumulateReducers(action), state);

  return composedReducer;
}
