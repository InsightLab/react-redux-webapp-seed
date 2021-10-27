import {
  ContainerBar,
  BtnFontNormal,
  BtnFontMinus,
  BtnFontPlus,
  BtnToggleTheme,
  BtnLibras,
} from './Styles';

interface Props {
  darkMode: boolean;
  onThemeToggle?: () => void;
  onFontMinus?: () => void;
  onFontPlus?: () => void;
  onFontNormal?: () => void;
  onLibras?: () => void;
}

export const ButtonBar = ({
  darkMode,
  onThemeToggle,
  onFontMinus,
  onFontPlus,
  onFontNormal,
  onLibras,
}: Props) => {
  return (
    <ContainerBar>
      <BtnFontNormal disabled={!onFontNormal} onClick={() => onFontNormal!()} />
      <BtnFontMinus disabled={!onFontMinus} onClick={() => onFontMinus!()} />
      <BtnFontPlus disabled={!onFontPlus} onClick={() => onFontPlus!()} />
      <BtnLibras disabled={true} onClick={() => onLibras!()} />
      <BtnToggleTheme
        role="switch"
        aria-label="tema claro/escuro"
        inverted={darkMode}
        onClick={() => onThemeToggle!()}
      />
    </ContainerBar>
  );
};
