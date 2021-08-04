import React from 'react';
import { store } from './Redux';
import { Provider } from 'react-redux';

// creating provider
const ProviderRedux: React.FC<{}> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

// exposing provider
export { ProviderRedux };
