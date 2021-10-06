import { createGlobalStyle } from 'styled-components';
import { fontFamily } from './fontFamily';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: ${(props) => props.theme.font.scale + `em`};
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    overflow-x: hidden;
    scroll-behavior: smooth;
    ${fontFamily.OpenSans};
    font-style: normal;
    background-color: ${({ theme }) => theme.background};
  }
`;
