import { useCallback } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useAuthorization } from '../../hooks';
import { routes } from '../../routes';
import { ErrorBoundary } from '../Shared';

export const PagesManager = () => {
  const user = useAuthorization();

  const toRoutePageMapping = useCallback(
    ({ validator, ...route }: TRoute) => {
      const routeComponent = <Route key={route.path} exact={true} {...route} />;

      if (!validator) {
        return routeComponent;
      }

      if (user) {
        return validator(user) ? routeComponent : null;
      }
    },
    [user]
  );

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Switch>{routes.map(toRoutePageMapping)}</Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
