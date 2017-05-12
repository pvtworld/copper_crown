import React from 'react';
import { connect } from 'react-redux';
import { resetRoof } from '../../Redux/Actions/copperMapActions';
import {Modal, Button} from 'react-bootstrap'

const RoofNotFound = (props) => {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Roof Not Found</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Better luck next time 
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={() => {props.dispatch(resetRoof())}}>OK</Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>)
}


export default connect()(RoofNotFound)
