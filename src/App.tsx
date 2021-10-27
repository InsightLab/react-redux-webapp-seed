import { ThemeProvider } from './theme';
import { RoutesManager } from './routes';
import { ReduxProvider } from './redux-providers';
import { AccessibilityHeader } from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <AccessibilityHeader />
        <RoutesManager />
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
