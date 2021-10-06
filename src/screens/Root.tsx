import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { ScreenDummyView } from './Dummy/View';

export const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={ScreenDummyView} />
        <Redirect from="" to="/home" />
      </Switch>
    </Router>
  );
};
