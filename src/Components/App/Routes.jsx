import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import NotFound from '../NotFound/NotFound';
import LoginContainer from '../LoginContainer/LoginContainer';
import App from './App';
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'

var redirectIfAuth = (props) => {
    console.log(props.auth);
    if(props.auth){
        browserHistory.push('/app')
    }
}

/*var checkIfAuth = () => {

}*/

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

const mapStateToProps = ({ firebase }) => {
      return {
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth')
      }
    }

export default (connect(mapStateToProps))(Routes)