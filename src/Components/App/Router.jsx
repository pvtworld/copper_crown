import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import NotFound from '../NotFound/NotFound';
import LoginContainer from '../LoginContainer/LoginContainer';
import CopperMap from '../CopperMap/CopperMap';
import InfoComponent from '../InfoComponent/InfoComponent'
import App from './App';
import Layout from './Layout'

export default (
    <Router history={browserHistory}>
        <Route path="/">
            <Route path="/app" component={App} />
            <Route path="/profile" component={() => <h1>Profile</h1>} />
            <Route path="/leaderboard" component={() => <h1>Leaderboard</h1>} />
            <Route path="/about" component={InfoComponent} />
            <IndexRoute component={LoginContainer} />
        </Route>
    <Route path="*" component={NotFound} />
</Router>
);
