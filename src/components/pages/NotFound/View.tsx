import { View } from './View.styled';

export const NotFoundView = ({ pathname }: { pathname: string }) => (
  <View>
    <h1>404</h1>
    <p>
      Sorry, this page could not be found "<b>{pathname}</b>"
    </p>
  </View>
);
