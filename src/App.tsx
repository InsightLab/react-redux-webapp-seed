import { ThemeProvider } from './theme';
import { Root } from './screens/Root';
import ReduxProvider from './redux-tk-providers/provider';

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
