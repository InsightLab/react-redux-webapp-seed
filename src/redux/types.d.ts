type SimpleSagaState<State> = {
  loading: boolean;
  data: State;
  error: any;
};

type TakeEveryEffect = typeof import('@redux-saga/core/effects').takeEvery;

type TakeLatestEffect = typeof import('@redux-saga/core/effects').takeLatest;

type AsyncTask<Args, Result> = (...args: Args[]) => Promise<Result>;

type SagaOptions<State, Args> = {
  name: string;
  initialState: SimpleSagaState<State>;
  asyncTask: AsyncTask<Args, State>;
  takeFn?: TakeEveryEffect | TakeLatestEffect;
};

type AsyncActionCreator<Args, Result> = (
  ...args: Args[]
) => (dispatch: TypedDispatch) => Promise<Result>;
