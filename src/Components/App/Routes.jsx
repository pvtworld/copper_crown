import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import NotFound from '../NotFound/NotFound';
import LoginContainer from '../LoginContainer/LoginContainer';
import App from './App';
import CopperMap from '../CopperMap/CopperMap';
import InfoComponent from '../InfoComponent/InfoComponent'
import Layout from './Layout'

var redirectIfAuth = () => {

}

var checkIfAuth = () => {

}

export default (
    <Router history={browserHistory}>
        <Route path="/">
            <Route path="/app" component={App} onEnter={checkIfAuth} />
            <Route path="/profile" component={() => <h1>Profile</h1>} onEnter={checkIfAuth} />
            <Route path="/leaderboard" component={() => <h1>Leaderboard</h1>} onEnter={checkIfAuth} />
            <Route path="/info" component={() => <h1>Info</h1>} onEnter={checkIfAuth} />
            <IndexRoute component={LoginContainer} onEnter={redirectIfAuth} />
        </Route>
    <Route path="*" component={NotFound} />
</Router>
);
