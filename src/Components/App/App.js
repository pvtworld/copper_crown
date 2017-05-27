import React from 'react';
import { connect } from 'react-redux';
import {pathToJS} from 'react-redux-firebase'
import GameContainer from '../GameContainer/GameContainer';
import { browserHistory } from 'react-router'
import { getPricePerSquareMeter, bindPriceMultiplier } from '../../Helpers/PointsHelpers';
// import * as pubnub from 'pubnub';

class App extends React.Component {

    componentDidMount() {
        getPricePerSquareMeter(this.props.dispatch);
        bindPriceMultiplier(this.props.dispatch);
    }

    redirectIfAuth = (props) => {
        if (!props.auth) {
            console.log('User is not auth, redirecting to login /', props.auth);
            browserHistory.push('/')
        } else {
            console.log('User is auth, doing nothing');

        }
    }

    render() {
        this.redirectIfAuth(this.props);
        console.log('Creating GameContainer');
        return ( <div>
                <GameContainer/>
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