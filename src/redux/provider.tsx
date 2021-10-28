import { Provider } from 'react-redux';
import { store } from './store';

export const ReduxProvider: React.FC<{}> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
