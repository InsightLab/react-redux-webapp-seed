import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle } from './globalStyle';
import { TScreenType, ScreenTypes, calcCurrentMediaType } from './mediaQuery';
import { ThemeDark } from './ThemeDark';
import { ThemeLight } from './ThemeLight';
import { useFontLevel } from './useFontLevel';
import * as db from './localStorage';

const THEME_MODE_DARK = `theme:dark`;
const QUERY_DARK_MODE = `(prefers-color-scheme: dark)`;

const saveDarkModeState = (darkMode: boolean) => {
  db.set(THEME_MODE_DARK, darkMode);
};

export const ThemeProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [theme, setTheme] = useState<Theme>(ThemeLight);
  const [screen, setScreen] = useState<TScreenType>(ScreenTypes.small);

  const font = useFontLevel();

  useEffect(() => {
    const x = 0; // fix horizontal scroll
    const y = window.scrollY || 0;
    window.scrollTo(x, y);
  }, []);

  useEffect(() => {
    const systemDark = window.matchMedia(QUERY_DARK_MODE).matches;
    const pageDark = !!db.get(THEME_MODE_DARK, systemDark);
    if (systemDark) {
      setDarkMode(systemDark && pageDark);
    } else {
      setDarkMode(systemDark || pageDark);
    }
  }, []);

  useEffect(() => {
    setTheme(darkMode ? ThemeDark : ThemeLight);
  }, [darkMode]);

  useEffect(() => {
    const systemDarkMode = window.matchMedia(QUERY_DARK_MODE);
    const onChangeDarkMode = () => {
      const systemDark = systemDarkMode.matches;
      saveDarkModeState(systemDark);
      setDarkMode(systemDark);
    };
    systemDarkMode.addEventListener(`change`, onChangeDarkMode);
    return () => systemDarkMode.removeEventListener(`change`, onChangeDarkMode);
  }, []);

  useEffect(() => {
    function resize() {
      const type = calcCurrentMediaType();
      setScreen(type);
    }
    resize();
    window.addEventListener(`resize`, resize, false);
    return () => window.removeEventListener(`resize`, resize);
  }, []);

  const context: Theme = useMemo(() => {
    return {
      ...theme,
      screen: {
        small: screen === ScreenTypes.small,
        medium: screen === ScreenTypes.medium,
        large: screen === ScreenTypes.large,
      },
      font,
      toggleTheme: () => {
        setDarkMode((prevDark) => {
          const dark = !prevDark;
          saveDarkModeState(dark);
          return dark;
        });
      },
    };
  }, [theme, screen, font]);

  return (
    <StyledThemeProvider theme={context}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
