import React from 'react'
import './ScoreComponents.css'
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';

const ScoreComponent = (props) => {
    return (
        <div className="topcorner">
            <h1 className="stroke">Score: {props.userInfo ? props.userInfo.points : ''}</h1>
        </div>
    )
}

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(ScoreComponent);

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
    })
)(wrappedPlayerInfo)

export default authConnected;
