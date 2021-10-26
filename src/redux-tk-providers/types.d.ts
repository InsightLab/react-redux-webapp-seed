type SimpleSagaState<State> = {
  loading: boolean;
  data: State;
  error: any;
};

type TakeEveryEffect = typeof import('@redux-saga/core/effects').takeEvery;

type TakeLatestEffect = typeof import('@redux-saga/core/effects').takeLatest;

type SagaOptions = {
  takeFn?: TakeEveryEffect | TakeLatestEffect;
};

type AsyncTask<Args, Result> = (...args: Args[]) => Promise<Result>;

type AsyncActionCreator<Args, Result> = (
  ...args: Args[]
) => (dispatch: TypedDispatch) => Promise<Result>;
