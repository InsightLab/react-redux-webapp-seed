import styled from 'styled-components';
import { media } from '../../styles/screens';

export const Status = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.sizes.margin};
  padding: ${({ theme }) => theme.sizes.padding};
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: ${({ theme }) => theme.effects.boxShadow};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};

  ${media.small} {
    width: 90%;
  }

  ${media.medium} {
    width: 50%;
  }
`;
