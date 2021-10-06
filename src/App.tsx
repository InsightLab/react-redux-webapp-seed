import { ThemeProvider } from './theme';
import { ReduxProvider } from './redux-providers';
import { Root } from './screens/Root';

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
