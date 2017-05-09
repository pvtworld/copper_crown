import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import NotFound from '../NotFound/NotFound';
import LoginContainer from '../LoginContainer/LoginContainer'

const Routes = ({ store }) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
            <Route path="/login" component={LoginContainer}/>
            <Route path="/profile" component={() => <h1>Profile</h1>} />
            <Route path="/leaderboard" component={() => <h1>Leaderboard</h1>} />
            <Route path="/about" component={() => <h1>About</h1>} />
            <Route path="*" component={NotFound} />
        </Router>
    </Provider>
);

Routes.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Routes;