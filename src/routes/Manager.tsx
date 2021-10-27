import { useCallback, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routes } from './routes';

export const RoutesManager = () => {
  const [user] = useState<UserMe>(); // This is just a mockup

  const createRoute = useCallback(
    ({ validator, ...route }: TRoute) => {
      const routeComponent = <Route key={route.path} exact={true} {...route} />;

      if (validator && user) {
        return validator(user) && routeComponent;
      }

      return routeComponent;
    },
    [user]
  );

  return (
    <BrowserRouter>
      <Switch>{routes.map(createRoute)}</Switch>
    </BrowserRouter>
  );
};
