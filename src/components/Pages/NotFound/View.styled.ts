import styled from 'styled-components';
import { fontFamily } from '../../../theme';

export const View = styled.section`
  padding-top: 100px;
  text-align: center;
  ${fontFamily.Nunito};
  font-size: 1.1rem;
  color: ${(props) => props.theme.text};
  p {
    opacity: 0.5;
  }
`;
