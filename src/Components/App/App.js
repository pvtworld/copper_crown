import React from 'react';
import { connect } from 'react-redux';
import {pathToJS} from 'react-redux-firebase'
import GameContainer from '../GameContainer/GameContainer';
import TeamChooser from '../TeamChooser/TeamChooser';
import { browserHistory } from 'react-router'
import { getPricePerSquareMeter, bindPriceMultiplier } from '../../Helpers/PointsHelpers';
import * as pubnub from 'pubnub';

class App extends React.Component {

    constructor(){
        super();
        this.state = {
            userID: Math.round(Math.random() * 1000000).toString(),
            history: []
        };
    }

    sendMessage = (message) => {
        this.PubNub.publish({
            channel: 'ReactChat',
            message: message,
        });
    }

    componentDidMount(){
        getPricePerSquareMeter(this.props.dispatch);
        bindPriceMultiplier(this.props.dispatch);

        this.PubNub = pubnub.init({
            publish_key: 'pub-c-425d3d2e-ad86-4961-bb14-1eb59efec74d',
            subscribe_key: 'sub-c-39bab7dc-3fcc-11e7-b6a4-02ee2ddab7fe',
            ssl: (location.protocol.toLowerCase() === 'https:'),
        });

        this.PubNub.subscribe({
            channel: 'ReactChat',
            message: (message) => this.setState({
                history: this.state.history.concat(message)
            }),
        });

    }

    redirectIfAuth = (props) => {
        if(!props.auth){
            console.log('User is not auth, redirecting to login /', props.auth);
            browserHistory.push('/')
        }else{
            console.log('User is auth, doing nothing');

        }
}

    render() {
        this.redirectIfAuth(this.props);
        console.log('Creating GameContainer');
        return (
            <div>
                <TeamChooser/>
                <GameContainer history={this.state.history}
                               userID={this.state.userID}
                               sendMessage={this.sendMessage}
                />
            </div>
        )
    }
}

const mapStateToProps = ({firebase}) => {
    return {
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth'),
        firebase: firebase
    }
}

export default (connect(mapStateToProps))(App)