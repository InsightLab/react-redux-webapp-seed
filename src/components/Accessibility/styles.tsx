import styled, { css } from 'styled-components';

interface ButtonProps {
  inverted?: boolean;
}

const IconButton = styled.button<ButtonProps>`
  display: inline-block;
  cursor: pointer;
  width: 26px;
  height: 26px;
  line-height: 1;
  margin-left: 6px;
  opacity: 0.9;
  background: #fff no-repeat center;
  background-size: 18px;
  transform: ${(props) =>
    props.theme.darkMode && props.inverted && `scale(-1,1)`};
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 1px 1px #0001;
  &:hover {
    opacity: 1;
    &:active {
      opacity: 0.8;
    }
  }
  ${(props) =>
    !props.disabled
      ? null
      : css`
          pointer-events: none;
          opacity: 0.4;
        `}
`;
export const BtnFontNormal = styled(IconButton)`
  background-image: url(/accessibility/icon-font-normal.svg);
`;
export const BtnFontMinus = styled(IconButton)`
  background-image: url(/accessibility/icon-font-minus.svg);
`;
export const BtnFontPlus = styled(IconButton)`
  background-image: url(/accessibility/icon-font-plus.svg);
`;
export const BtnToggleTheme = styled(IconButton)`
  background-image: url(/accessibility/icon-theme.svg);
`;
export const BtnLibras = styled(IconButton)`
  background-image: url(/accessibility/icon-libras.svg);
`;
export const ContainerBar = styled.div`
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => (theme.darkMode ? '#444' : '#eee')};
`;
