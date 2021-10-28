import { Wrapper } from './index.styled';

export const NotFoundView = ({ pathname }: { pathname: string }) => (
  <Wrapper>
    <h1>404</h1>
    <p>
      Sorry, this page could not be found "<b>{pathname}</b>"
    </p>
  </Wrapper>
);
