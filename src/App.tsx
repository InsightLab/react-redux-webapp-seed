import { ThemeProvider } from './theme';
import { RoutesManager } from './components/RoutesManager';
import { ReduxProvider } from './redux-providers';
import { AccessibilityHeader } from './components/UI';

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
