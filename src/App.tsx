import './App.css';
import { ProviderRedux } from './redux-providers/ProviderRedux';
import { Root } from './screens/Root';

function App() {
  return (
    <ProviderRedux>
      <Root />
    </ProviderRedux>
  );
}

export default App;
