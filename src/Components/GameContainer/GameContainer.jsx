import React from 'react';
import { connect } from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase'
import ScoreComponent from '../ScoreComponent/ScoreComponent'
import CopperMap from '../CopperMap/CopperMap';
import Navigationbar from '../Navigation/Navigationbar';

class GameContainer extends React.Component{

    render() {
        if (!this.props.userInfo) {
            this.props.dispatch({type: 'CREATING_DEFAULT_USER_VALUES'})
            this.props.firebase.set(`users/${this.props.uid}`, {points: 0, areaOfCopper: 0, roofsStolen: 0, username: this.props.username})
                .then(() => {
                    this.props.dispatch({type: 'CREATED_DEFAULT_USER_VALUES'})
                    return Promise.resolve();
                })
        }

        return (
            <div>
                <Navigationbar/>
                <ScoreComponent/>
                <CopperMap/>
            </div>
        )
    }
}

const mapStateToProps = (state, {auth}) => {
    return{
        userInfo: dataToJS(state.firebase, `users/${auth.uid}`),
        username: auth.displayName,
        uid : auth.uid
    }
}

const propsConnected = connect(mapStateToProps)(GameContainer)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}` : '/']))(propsConnected);

const authConnected = connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth')
    })
)(wrappedPlayerInfo)

export default authConnected