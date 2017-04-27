import React from 'react'
import base from '../../Firebase/base';
import CopperMap from '../CopperMap/CopperMap';

export default class App extends React.Component {
    constructor(){
        super();
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.addRoof = this.addRoof.bind(this);

    }

    state = {
        uid: null,
        userInfo : {
            points: 0,
            areaOfCopper: 0,
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
        console.log('current user: ');
        console.log(authData)
        if (err) {
            console.error(err);
            return;
        }
            this.setState({
                uid: authData.user.uid,
            });
        };

    addRoof(newPoints, newArea) {
        const userInfo= {...this.state.userInfo};
        userInfo.points += parseInt(newPoints, 10);
        userInfo.areaOfCopper += parseInt(newArea, 10);
        this.setState({ userInfo });
    }

    renderLogin() {
        return (
            <nav>
                <h2>CopperCrown</h2>
                <p>Sign in to play the Game</p>
                <button onClick={() => this.authenticate('github')}>Log In with Github</button>
                <button onClick={() => this.authenticate('facebook')} >Log In with Facebook</button>
                <button onClick={() => this.authenticate('google')} >Log In with Google</button>
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
                    addRoof={this.addRoof}
                    
                />
                {logout}

            </div>
        )
    }
}