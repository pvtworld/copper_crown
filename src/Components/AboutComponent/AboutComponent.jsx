import React from 'react';
import { Button } from 'react-bootstrap'
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { resetModal } from '../../Redux/Actions/navigationActions';
import { connect } from 'react-redux'

const AboutComponent = (props) => {
    const back = <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>Close</Button>;
    return (
        <div className="navpage-box">
            {back}
            <div>
                <h3>Info Component</h3>
                <p>Copper roofs are dope</p>
            </div>
        </div>
    )
};

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(AboutComponent)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
    })
)(wrappedPlayerInfo)

export default authConnected;