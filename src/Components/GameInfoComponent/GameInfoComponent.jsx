import React from 'react';
import { Button, Modal } from 'react-bootstrap'
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { resetModal } from '../../Redux/Actions/navigationActions';
import { connect } from 'react-redux'
import DeadlineClock from '../DeadlineClock/DeadlineClock'

const GameInfoComponent = (props) => {

    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Game info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Game session ends in:</p>
                    <DeadlineClock/>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </div>
    )
};

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(GameInfoComponent)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
    })
)(wrappedPlayerInfo)

export default authConnected;

