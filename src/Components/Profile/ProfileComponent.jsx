import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import './ProfileComponent.css';
import { Button, Image, Modal } from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions';

const ProfileComponent = (props) => {

    return (
        <div className="static-modal">
            <Modal.Dialog dialogClassName="light-modal">
                <Modal.Header>
                    <Modal.Title>Profile Component</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h1>My account</h1>
                    <h4>Logged in as: {props.auth.displayName} </h4>
                    <h5>Username: {props.userInfo.username}</h5>
                    <h5>User ID:  {props.auth.uid}</h5>
                    <Image id="picture" src={props.auth.photoURL} circle />
                    <h5>Mail: {props.auth.email}</h5>
                    <h5>Points: {props.userInfo.points}</h5>
                    <h5>Number of roofs taken: {props.userInfo.roofsStolen ? props.userInfo.roofsStolen : '0'}</h5>
                    <h5>Area of roofs taken:  {props.userInfo.areaOfCopper}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="default" onClick={() => props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </div>
    )
}

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(ProfileComponent)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? (`users/${auth.uid}`): ('/')]))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
     auth: pathToJS(firebase, 'auth')
  })
)(wrappedPlayerInfo)

export default authConnected
