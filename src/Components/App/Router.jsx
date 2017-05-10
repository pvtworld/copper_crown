import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import NotFound from '../NotFound/NotFound';
import LoginContainer from '../LoginContainer/LoginContainer';
import CopperMap from '../CopperMap/CopperMap';
import App from './App';

export default (
    <Router history={browserHistory}>
        <Route path="/">
            <Route path="/app" component={App} />
            <Route path="/profile" component={() => <h1>Profile</h1>} />
            <Route path="/leaderboard" component={() => <h1>Leaderboard</h1>} />
            <Route path="/about" component={() => <h1>About</h1>} />
            <IndexRoute component={LoginContainer} />
        </Route>
    <Route path="*" component={NotFound} />
</Router>
);
