import { ThemeProvider } from './theme';
import { Root } from './screens/Root';
import ReduxProvider from './redux-providers/provider';

function App() {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <Root />
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
