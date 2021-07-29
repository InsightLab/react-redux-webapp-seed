import { ProviderRedux } from './redux-providers/ProviderRedux';
import { ThemeProvider } from 'styled-components';
import { Root } from './screens/Root';
import { theme } from './styles/theme';

function App() {
  return (
    <ProviderRedux>
      <ThemeProvider theme={theme}>
        <Root/>
      </ThemeProvider>
    </ProviderRedux>
  );
}

export default App;
