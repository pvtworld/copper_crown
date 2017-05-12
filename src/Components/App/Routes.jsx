import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import NotFound from '../NotFound/NotFound';
import LoginContainer from '../LoginContainer/LoginContainer';
import App from './App';
import CopperMap from '../CopperMap/CopperMap';
import InfoComponent from '../InfoComponent/InfoComponent'
import Layout from './Layout'
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'
import { UserIsNotAuth } from './routerUtils'

var redirectIfAuth = (props) => {
    console.log(props.auth);
}

var checkIfAuth = () => {

}

const Routes = (props) => (
    <Router history={browserHistory}>
        <Route path="/">
            <Route path="/app" component={App} />
            <Route path="/profile" component={() => <h1>Profile</h1>} />
            <Route path="/leaderboard" component={() => <h1>Leaderboard</h1>} />
            <Route path="/info" component={() => <h1>Info</h1>} />
            <IndexRoute component={LoginContainer} />
        </Route>
    <Route path="*" component={NotFound} />
</Router>
);

const mapStateToProps = ({firebase}) => {
      return {
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth')
      }
    }

export default (connect(mapStateToProps))(Routes)