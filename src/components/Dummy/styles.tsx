import styled from 'styled-components';
import { fontFamily, mediaQuery } from '../../theme';

export const Status = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

export const Text = styled.p`
  text-align: center;
  ${fontFamily.Nunito};
  font-size: 1.1rem;
  color: ${(props) => props.theme.text};
  opacity: 0.5;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10vh;
  ${fontFamily.OpenSans};
  font-size: 3rem; /* utilizando "rem" para responsividade */

  ${mediaQuery.mediumScreen} {
    padding-top: 20vh;
    font-size: 2rem;
  }

  ${mediaQuery.smallScreen} {
    padding-top: 30vh;
    font-size: 1.5rem;
  }
`;
