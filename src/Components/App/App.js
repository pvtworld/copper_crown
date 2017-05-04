import React from 'react';
import base from '../../Firebase/base';
import LoginContainer from '../LoginContainer/LoginContainer';
import GameContainer from '../GameContainer/GameContainer';
import {getPricePerSquareMeter} from '../../Helpers/PointsHelpers';

export default class App extends React.Component {
    constructor(){
        super();
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.addRoof = this.addRoof.bind(this);
        this.roofAlreadyStolen = this.roofAlreadyStolen.bind(this);
        this.getLeader = this.getLeader.bind(this);
    }

    state = {
        userInfo: {
            points: 0,
            areaOfCopper: 0,
        },
        uid: null,
        pricePerSquareMeter: null,
        userLoading: false
    }


        componentWillMount() {
            base.onAuth((user) => {
                if(user) {
                    this.authHandler(null, { user });
                    this.ref = base.syncState(`users/${user.uid}`, {
                        context: this,
                        state: 'userInfo'
                    });
                    this.setState({userLoading: false})
                }
            });
        }
        

    componentDidMount() {
        getPricePerSquareMeter((newPrice) => {
            this.setState({pricePerSquareMeter: newPrice});
        });

    }

    componentWillUnmount() {
        base.removeBinding(this.ref);

    }

    authenticate(provider) {
        console.log(`Trying to log in with ${provider}`); 
        this.setState({userLoading: true})
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    logout() {
        base.unauth();
        console.log('Logging out');
        this.setState({uid: null});
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
                userLoading: false
            });
        };

    getLeader() {
        base.fetch('users', {
            context: this,
            queries: {
                orderByChild: 'points', },
            asArray: true,
            then(response){
                response.reverse().forEach(function(element) {
                    console.log("user: "+element.key + ", points: " +element.points);
                });
            }
        });
    }

    roofAlreadyStolen(newRoof, callback) {
        base.fetch('stolenRoofs', {
            context: this,
            queries: {
                orderByChild: 'roofId',
                equalTo: newRoof.id},
            then(response){
                console.log(Object.keys(response).length)
                callback(newRoof, (Object.keys(response).length));
            }
        });
    }

    addRoof(newPoints, newArea, newRoof) {
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
        console.log("adding to firebase")
        base.push('stolenRoofs', {
            data: {roofId: newRoof},
            then(err){
                if(err){
                    console.log(err);
                }
            }
        });

        this.setState({ userInfo });
    }




    renderLogin() {
        return (
            <LoginContainer authenticate={this.authenticate}
                            userLoading={this.state.userLoading}
            />
        )
    }

    render() {
        // check if they are no logged in at all
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        return (
            <div>
                <GameContainer state={this.state}
                               addRoof={this.addRoof}
                               roofAlreadyStolen={this.roofAlreadyStolen}
                               logout={this.logout}
                               getLeader={this.getLeader}
                               isLoading={this.state.userLoading}
                />
            </div>
        )
    }
}