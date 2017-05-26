import React from 'react';
import { Button, Modal } from 'react-bootstrap'
import { resetModal } from '../../Redux/Actions/navigationActions';
import { connect } from 'react-redux'
//import DeadlineClock from '../DeadlineClock/DeadlineClock'

const GameInfoComponent = (props) => {

    return (
        <div className="static-modal">
            <Modal.Dialog dialogClassName="full-modal">
                <Modal.Header>
                    <Modal.Title>Game info </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </div>
    )
};

export default connect()(GameInfoComponent)

