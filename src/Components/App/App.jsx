import React from 'react'
import CopperMap from '../CopperMap/CopperMap';
import Login from '../Login/Login';
import firebase from '../../Firebase/firebase';
import Welcome from '../Welcome/Welcome';

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
            <CopperMap/>
        );
    }
}