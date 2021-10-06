interface TFontConfig {
  level: number;
  scale: number;
  increase?: () => void;
  decrease?: () => void;
  normalize?: () => void;
}

type Theme = {
  darkMode: boolean;
  toggleTheme?: () => void;

  font: TFontConfig;

  screen: {
    small: boolean;
    medium: boolean;
    large: boolean;
  };

  primary: string;
  secondary: string;

  text: string;
  background: string;
};
