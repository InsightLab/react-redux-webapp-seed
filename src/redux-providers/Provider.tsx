import React from 'react';
import { store } from './Redux';
import { Provider } from 'react-redux';

// creating provider
const ReduxProvider: React.FC<{}> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

// exposing provider
export { ReduxProvider };
