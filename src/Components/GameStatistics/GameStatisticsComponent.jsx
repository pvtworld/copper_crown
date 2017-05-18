import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import { Button, Modal } from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions';

const GameStatisticsComponent = (props) => {

    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Game statistics</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>Total number of roofs:</h5>
                    <h5>Number of roofs left:</h5>
                    <h5>Percent of roofs left:</h5>
                    <br></br>
                    <h5>Total numbers of roofs stolen:</h5>
                    <h5>Total percent of roofs stolen:</h5>
                    <br></br>
                    <br></br>
                    <h5>Numbers of roofs stolen by team:</h5>
                    <h5>Percent of roofs stolen:</h5>
                    <h5>Personal contribution:</h5>
                    <h5>Contribution in percent: </h5>
                    <h5></h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </div>
    )
}
export default connect()(GameStatisticsComponent);