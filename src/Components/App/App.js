import React from 'react'
import base from '../../Firebase/base';
import CopperMap from '../CopperMap/CopperMap';
import Login from '../Login/Login';

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
        base.authWithOAuthRedirect(provider, this.authHandler);
    }

    logout() {
        base.unauth();
        this.setState({ uid: null });
    }

    authHandler(err, authData)  {
        console.log('current user: ');
        console.log(authData)
        if (err) {
            alert(err)
            console.error(err);
            return;
        }
            this.setState({
                uid: authData.user.uid,
            });
        };

    addRoof(newPoints, newArea) {
        const userInfo= {...this.state.userInfo};
        if(userInfo.points) {
            userInfo.points += parseInt(newPoints, 10);
        } else {
            userInfo.points = parseInt(newPoints, 10);
        }
        if(userInfo.areaOfCopper) {
            userInfo.areaOfCopper += parseInt(newArea, 10);
        } else {
            userInfo.areaOfCopper = parseInt(newArea, 10);
        }

        this.setState({ userInfo });
    }

    renderLogin() {
        return (
            <Login authenticate={this.authenticate} />
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