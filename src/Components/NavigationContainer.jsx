import React from 'react';
import Navigation from './Navigation';
import * as auth from './../Helpers/AuthHelpers';
import firebase from './../Firebase/firebase';

class NavigationContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            userName: 'default name'
        }
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        var storeTempDisplayName = '';
        if (user != null) {
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: "+profile.providerId);
                console.log("  Provider-specific UID: "+profile.uid);
                console.log("  Name: "+profile.displayName);
                console.log("  Email: "+profile.email);
                console.log("  Photo URL: "+profile.photoURL);
                storeTempDisplayName = profile.displayName;
            });
        }
        this.setState({
            userName: storeTempDisplayName
        })

    }

    logoutUser(event){
        event.preventDefault();
        auth.userLogout();
    }

    render() {
        return (
                <Navigation userName={this.state.userName} userLogout={this.logoutUser}/>
        );
    }
}

export default NavigationContainer;