import { useCallback, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routes } from '../../routes';

export const PagesManager = () => {
  const [user] = useState<UserMe>({}); // This is just a mockup

  const toRoutePageMapping = useCallback(
    ({ validator, ...route }: TRoute) => {
      const routeComponent = <Route key={route.path} exact={true} {...route} />;

      if (!validator) {
        return routeComponent;
      }

      if (user) {
        return validator(user) ? routeComponent : null;
      }
      // redirect to login page ?
    },
    [user]
  );

  return (
    <BrowserRouter>
      <Switch>{routes.map(toRoutePageMapping)}</Switch>
    </BrowserRouter>
  );
};
