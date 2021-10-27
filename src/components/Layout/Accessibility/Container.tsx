import { useTheme } from 'styled-components';
import { ButtonBar } from './View';

export const AccessibilityHeader = () => {
  const theme = useTheme();

  function clickLibras() {
    console.log(`[TODO] ativar algum plugin libras...`);
  }

  return (
    <ButtonBar
      darkMode={theme.darkMode}
      onFontNormal={theme.font.normalize}
      onFontMinus={theme.font.decrease}
      onFontPlus={theme.font.increase}
      onThemeToggle={theme.toggleTheme}
      onLibras={clickLibras}
    />
  );
};
