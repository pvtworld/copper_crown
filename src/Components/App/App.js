import React from 'react'
import base from '../../Firebase/base';
import CopperMap from '../CopperMap/CopperMap';
import firebase from '../../Firebase/firebase';

export default class App extends React.Component {
    constructor(){
        super();
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.addPoints = this.addPoints.bind(this);
    }

    state = {
        authed: false,
        userInfo : {
            points: 0,
        }
    }


        componentWillMount() {
            base.onAuth((user) => {
                if(user) {
                    this.authHandler(null, { user });
                    this.ref = base.syncState(`users/${user.uid}`, {
                        context: this,
                        state: 'userInfo'
                    });
                }
            });
        }


    componentWillUnmount () {
        this.removeListener();
        base.removeBinding(this.ref);

    }

    authenticate(provider) {
        console.log(`Trying to log in with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout() {
        base.unauth();
        this.setState({ uid: null });
    }

    authHandler(err, authData)  {
        console.log(authData);
        if (err) {
            console.error(err);
            return;
        }
            this.setState({
                uid: authData.user.uid,
            });
        };

    addPoints(newPoints) {
        console.log("points is:")
        console.log(newPoints);

        const userInfo= {...this.state.userInfo};
        userInfo.points += newPoints;
        // set state
        this.setState({ userInfo });
    }

    renderLogin() {
        return (
            <nav className="login">
                <h2>CopperCrown</h2>
                <p>Sign in to play the Game</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
                <button className="google" onClick={() => this.authenticate('google')} >Log In with Google</button>
            </nav>
        )
    }

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;

        // check if they are no logged in at all
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        return (
            <div>
                <CopperMap
                    state={this.state}
                    addPoints={this.addPoints}
                />
                {logout}

            </div>
        )
    }
}