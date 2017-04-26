import React from 'react'
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom';
import base from '../../Firebase/base';
import CopperMap from '../CopperMap/CopperMap';
import Login from '../Login';
import firebase from '../../Firebase/firebase';
import Welcome from '../Welcome';

function PublicRoute ({component: Component, authed, ...rest}) {
    return (
        <Route {...rest} render={(props) => authed === false
            ? <Component {...props} />
            : <Redirect to='/coppermap' />}
        />
    )
}

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest} render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
    )
}

export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            authed: false,
            points: 0
        this.addPoints = this.addPoints.bind(this);

    state = {
        authed: false,
        userInfo : {
            points: 0,
        }
    }
    componentDidMount () {


    componentWillMount() {
        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true
                });

                this.ref = base.syncState(`users/${user.uid}`, {
                    context: this,
                    state: 'userInfo'
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

    addPoints(newPoints) {
        console.log("points is:")
        console.log(newPoints);

        const userInfo= {...this.state.userInfo};
        userInfo.points += newPoints;
        // set state
        this.setState({ userInfo });
    }


    render() {
        return (
        );
    }
}