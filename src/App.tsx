import { ThemeProvider } from 'styled-components';
import { ProviderRedux } from './redux-providers';
import { Root } from './screens/Root';
import { theme } from './styles/theme';

function App() {
  return (
    <ProviderRedux>
      <ThemeProvider theme={theme}>
        <Root />
      </ThemeProvider>
    </ProviderRedux>
  );
}

export default App;
