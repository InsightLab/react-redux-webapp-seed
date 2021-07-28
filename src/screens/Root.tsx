import { FunctionComponent } from 'react';
import { Redirect, Route, BrowserRouter as Router, RouterProps, Switch } from 'react-router-dom';
import { ScreenDummyView } from './Dummy/View';

export const Root: FunctionComponent = () => {
  return( 
    <Router>
      <Switch>
        <Route path="/home" component={ScreenDummyView} />
        <Redirect from="" to="/home"/>
      </Switch>
    </Router>
  )
}