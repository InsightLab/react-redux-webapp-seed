import { useCallback } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useAuth } from '../hooks';
import { routes } from '../routes';
import { ErrorBoundary } from './shared';

export const PagesManager = () => {
  const user = useAuth();

  const toRoutePageMapping = useCallback(
    ({ permission, ...route }: TRoute) => {
      const routeComponent = <Route key={route.path} exact={true} {...route} />;

      if (!permission) {
        return routeComponent;
      }

      if (user) {
        return permission(user) ? routeComponent : null;
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
