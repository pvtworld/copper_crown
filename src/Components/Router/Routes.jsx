import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import NotFound from '../NotFound/NotFound';
import LoginContainer from '../LoginContainer/LoginContainer';
import App from '../App/App';

const rout = (
    <Route path="/">
        <Route path="/app" component={App} />
        <IndexRoute component={LoginContainer} />
        <Route path="*" component={NotFound} />
    </Route>
)

const Routes = () => (
    <Router history={browserHistory}>
        {rout}
    </Router>
);

export default Routes;