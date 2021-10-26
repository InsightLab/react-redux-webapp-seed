import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { StatusContainer } from './Entities/Status/Container';
import { UsersFormContainer } from './Entities/Users/Form/Container';
import { UsersListContainer } from './Entities/Users/List/Container';
import { wrapSimpleScreen } from './UI';

type RoutesManagerProps = {
  home?: string;
};

export const RoutesManager = ({ home = '/' }: RoutesManagerProps) => {
  return (
    <Router>
      <Switch>
        <Route path={'/'} component={wrapSimpleScreen(StatusContainer)} />
        <Route
          path="/users"
          render={() => (
            <Switch>
              <Route
                path="/users/list"
                component={wrapSimpleScreen(UsersListContainer)}
              />
              <Route
                path="/users/(new|edit)/:id"
                component={wrapSimpleScreen(UsersFormContainer)}
              />
              <Redirect from="/users" to="/users/list" />
            </Switch>
          )}
        />
      </Switch>
      <Redirect to={home} />
    </Router>
  );
};
