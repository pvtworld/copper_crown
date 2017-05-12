import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import './ProfileComponent.css';
import { Button, Image } from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions';
const ProfileComponent = (props) => {
    const back = <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>Close</Button>;

    return (
        <div className="navpage-box">
            <h1>Profile Component</h1>
            {back}
            <div id="center_text">
                <h1>My account</h1>
                <h4>Logged in as: {props.auth.displayName} </h4>
                <h5>User ID:  {props.auth.uid}</h5>
                <Image id="picture" src={props.auth.photoURL} circle />
                <h5>Mail: {props.auth.email}</h5>
                <h5>Points: {props.userInfo.points}</h5>
                <h5>Number of roofs taken: {'Not implemented'}</h5>
                <h5>Area of roofs taken:  {props.userInfo.areaOfCopper}</h5>
            </div>
        </div>
    )
}


const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(ProfileComponent)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected
