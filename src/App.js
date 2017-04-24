import React from 'react'
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom';
import CopperMap from './Components/CopperMap';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import firebase from './Firebase/firebase';
import Welcome from './Components/Welcome';

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
    )
}

function PublicRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === false
                ? <Component {...props} />
                : <Redirect to='/dashboard' />}
        />
    )
}

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            authed: false
        }
    }
    componentDidMount () {
        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true
                });
                console.log('User IS auth');
            } else {
                this.setState({
                    authed: false
                });
                console.log('User NOT auth');
            }
        })
    }
    componentWillUnmount () {
        this.removeListener()
    }
    render() {
        return (
            <BrowserRouter>
                        <Switch>
                            <Route path='/' exact component={Welcome} />
                            <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                            <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                            <PrivateRoute authed={this.state.authed} path='/coppermap' component={CopperMap} />
                            <Route render={() => <h3>404 feterror</h3>} />
                        </Switch>
            </BrowserRouter>
        );
    }
}