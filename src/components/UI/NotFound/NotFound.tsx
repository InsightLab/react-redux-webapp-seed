import { useLocation } from 'react-router';
import { Wrapper } from './NotFound.styled';

export function NotFound() {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <h1>404</h1>
      <p>
        Sorry, this page could not be found "<b>{pathname}</b>"
      </p>
    </Wrapper>
  );
}
