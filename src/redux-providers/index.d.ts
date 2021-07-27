type SagaError = {
  code: number;
  message: string;
};

interface ReduxSagaState<State>  {
  loading: boolean;
  data: State | {};
  error: SagaError | null;
}

interface ReduxArrayState<State, U> extends ReduxSagaState<State> {
  data: U[]
}

type ReduxState<State> = State | ReduxSagaState<State>

interface ReduxKeyedState<State> extends ReduxState<State> { 
  [key: string]: ReduxState<State> 
} 

// Action
interface ReduxAction<Payload> extends import('redux').Action<string> {
  type: string;
  payload?: Payload;
  key?: string;
}

interface ReduxRunAction<Payload> extends ReduxAction<Payload> {
  type: string;
  payload: Payload;
  resolve: <Result>(_: Result) => void;
  reject: (_: SagaError) => void;
};

interface ReduxResultAction<Payload> extends ReduxAction<Payload> {
  type: string;
  payload: Payload;
};

// Reducer
type ReduxReducer = <State, Payload>(
  state: ReduxState<State> | undefined,
  action: ReduxAction<Payload>
) => ReduxState<State>

type ReduxReducersCollection = { [index: string]: ReduxReducer }

type ReduxComposableReducer = ReduxReducer | ReduxReducersCollection

// Action Creator
type ReduxDispatch<T> = import('redux').Dispatch<T>;

type ReduxDispatchActionCreator<Payload, Result> = 
  (payload?: Payload) => (dispatch: ReduxDispatch<ReduxAction<Payload>>) => Promise<Result>;

type ReduxSimpleActionCreator<Payload> =
  (payload?: Payload) => ReduxAction<Payload>;

type ReduxActionCreator<Payload, Result> = 
  | ReduxDispatchActionCreator<Payload, Result> 
  | ReduxSimpleActionCreator<Payload>;

type ActionCreators<Payload, Result> = { [index: string]: ReduxActionCreator<Payload, Result> }

// Saga Controller 
type SagaControllerConstructor<T, Params, Result> = {
  asyncTask: (params: Params) => import('axios').AxiosPromise<Result>;
  saga: string;
  initialState: ReduxState<T>;
  take?: string;
};

type SagaGenerator<T> = Generator<CallEffect<T> | PutEffect<ReduxAction<T>>, void, T>;

type SagaWatcher<T> = () => Generator<ForkEffect<T>, void, T>

type ReduxOptions<T> = {
  initialState: ReduxState<T>;
  take?: string;
};

type ActionKeyedConfig<Props> = 
  | ActionKeyedConfigFunction 
  | ActionKeyedConfigObj;


type ActionKeyedConfigFunction<Props> = (props: Props) => string;
type ActionKeyedConfigObj<Props> = {
  keyName: string,
  getKey: (props: Props) => string
} 