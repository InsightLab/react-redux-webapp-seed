import { ThemeProvider } from './theme';
import { ReduxProvider } from './redux-providers';
import { AccessibilityHeader } from './components/Layout';
import { PagesManager } from './components/Pages/PagesManager';

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
