const initialState: ReduxState<any> = {
  loading: false,
  data: null,
  error: null
}

export const ReduxReducersUtils = {
  /**
   * Applies sequentially all reducers.
   * when one action is triggered.
   * @param {Array} reducers a list of reducers.
   * @return {Object} new state.
   */
  compose<State, Payload>(...reducers: ReduxComposableReducer[]) {
    return (state: ReduxState<State> | undefined, action: ReduxAction<Payload>): ReduxState<State> =>
      reducers.reduce(
        (acc, reducer) => this.consume(acc, action, reducer),
        state
      ) as ReduxState<State>;
  },

  /**
   * Combine two actions as one reducer.
   * @param {*} actionTypes Actions type to combine.
   * @return {Fuction} An function that receives an reducer to be consume when an action of one of type is triggered.
   */
  combine<T>(...actionTypes: string[]) {
    return (reducer: ReduxReducer) => (state: ReduxState<T>, action: ReduxAction<T>) => {
      const match =
        actionTypes.find((type) => type === action.type) !== undefined;
      return (match && this.consume(state, action, reducer)) || state;
    };
  },

  /**
   * Apply an reducer according to type of reducer.
   * Available types:
   * - function (as traditionally)
   * - object: works as a kay-map of reducers by type. Ex.:
   *    {
   *      "MY_ACTION": (state, action) => { ... } // ... do somthething and returns an state
   *    }
   * @param {Object} state Current state.
   * @param {Object} action Action object from redux action cretors.
   * @param {*} reducer Reducer of one of available types.
   * @return {Object} new state.
   */
  consume<State, Payload>(
    state: ReduxState<State> | undefined, 
    action: ReduxAction<Payload>, 
    reducer: ReduxComposableReducer
  ): ReduxState<State> | undefined {
    if (typeof reducer === 'function') return reducer(state, action);
    else if (typeof reducer === 'object')
      return this.consumeReducerObject(state, action, reducer);
    else return state;
  },

  /**
   * Apply an reducer of type key-map.
   * @param {Object} state Current state.
   * @param {Object} action Action object from redux action cretors.
   * @param {Object} reducers Key-map of reducers.
   * @return {Object} new state.
   */
  consumeReducerObject<State, Payload>(
    state: ReduxState<State> | undefined, 
    action: ReduxAction<Payload>, 
    reducers: ReduxReducersCollection
  ): ReduxState<State> | undefined {
    const r = reducers[action.type];
    return (r && r(state, action)) || state;
  },

  /**
   * Creates and key-map of reducers.
   * @param {Object} options { initialState: mixed type }
   * @param {Object} reducers Key-map object that maps reducers by types.
   * @return {Function} Reducer created from key-map.
   */
  object<T>(options: ReduxOptions<T>, reducers: ReduxReducersCollection) {
    const { initialState } = options;

    return <State, Payload>(state: ReduxState<State> | undefined = initialState as ReduxState<State>, action: ReduxAction<Payload>): ReduxState<State> =>
      this.consumeReducerObject(state, action, reducers) as ReduxState<State>;
  },

  /**
   * Route actions to sub-state of correspondent key of action.
   * @param {*} config { keyName: key property in action, initialState: initial state of this reducer :/ }
   * @return {*} An function that receives an reducer apply it to specific keyed sub-state.
   */
  keyed<T>(initialState: ReduxKeyedState<T>) {
    // takes a reducer to apply it in specific sub-state
    return (reducer: ReduxReducer) => 
      // return a another reducer
      <State, Payload>(
        state: ReduxKeyedState<State> | undefined = initialState as unknown as ReduxKeyedState<State>, 
        action: ReduxAction<Payload>
      ): ReduxKeyedState<State> => {
        const key = action.key;
        
        if (key) {
          return {
            // key exists, update sub-state
            ...state,
            [key]: this.consume(/* sub-state */ state[key], action, reducer) as ReduxState<State>,
          }
        }

        return state
      };
  },
};
