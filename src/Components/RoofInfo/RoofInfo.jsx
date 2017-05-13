import React from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import {firebaseConnect} from 'react-redux-firebase'
import {resetRoof} from '../../Redux/Actions/copperMapActions';
import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';


const addRoof = (update, uid, newArea, newRoof, dispatch) => {
    // //update(`users/${uid}`, {points: "", areaOfCopper: 'is a value' })
    //     base.push('stolenRoofs', {
    //         data: {roofId: newRoof},
    //         then(err){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else
    //                 dispatch(resetRoof)
    //         }
    //     });
    dispatch(resetRoof());
    }

const tooltipSteal = (
    <Tooltip id="tooltipSteal">Steal roof and add the current value to your account</Tooltip>
);

const tooltipLeave = (
    <Tooltip id="tooltipLeave">Leave roof in hopes that the value will increase</Tooltip>
);



const RoofInfo = (props) => {
            return (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Roof Found</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            Will you claim it?
                        </Modal.Body>

                        <Modal.Footer>
                                <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipLeave}>
                                    <Button bsStyle="danger" bsSize="large" block onClick={() => props.dispatch(resetRoof())}>Leave</Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipSteal}>
                                    <Button bsStyle="success" bsSize="large" block onClick={() => addRoof(props.firebase.update, props.uid, props.points, props.area, props.dispatch)}>Steal</Button>
                                </OverlayTrigger>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>)
}
const mapStateToProps = (state, { firebase }) => {
    return{
        uid: firebase.auth.uid,
        id: state.copperRoof.id,
    }
}

export default compose(firebaseConnect(), connect(mapStateToProps))(RoofInfo)
