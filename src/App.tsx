import { ThemeProvider } from './theme';
import { ReduxProvider } from './redux';
import { AccessibilityHeader } from './components/layout';
import { PagesManager } from './components/PagesManager';

function App() {
  return (
    <ThemeProvider>
      <ReduxProvider>
        <AccessibilityHeader />
        <PagesManager />
      </ReduxProvider>
    </ThemeProvider>
  );
}

export default App;
