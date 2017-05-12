import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import { Button, Modal} from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions'

const PlayerInfo = (props) => {

        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Player Info</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <ListGroup>
                            <ListGroupItem bsStyle="success">PlayerID: {props.auth.uid} </ListGroupItem>
                            <ListGroupItem bsStyle="info">Value of copper stolen: {props.userInfo.points || 0 + ' kr'}</ListGroupItem>
                            <ListGroupItem bsStyle="warning">Area of copper stolen: {props.userInfo.areaOfCopper || 0 + ' cm2'}</ListGroupItem>
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>OK</Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        )
    }

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(PlayerInfo)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected;

