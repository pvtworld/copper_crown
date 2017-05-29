import React from 'react'
import './ScoreComponents.css'
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import CircularProgress from 'material-ui/CircularProgress';

const ScoreComponent = (props) => {
    return (
        <div className="topcorner">
            {!props.loadingUser ?
            <h1 className="stroke">Score: {props.userInfo ? props.userInfo.points : ''}</h1>
            :
            <CircularProgress color={'#ffeb3b'}/>
            }
        </div>
    )
}

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined,
    loadingUser: auth ? pathToJS(firebase, `requesting/users/${auth.uid}`) : undefined
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
