import React from 'react';
import { connect } from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase'
import {resetRoof} from '../../Redux/Actions/copperMapActions';
import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';


const addRoof = (firebase, uid, id, price, area, userInfo, dispatch) => {

    let newUserPoints = userInfo.points + parseInt(price, 10);
    let newUserArea = userInfo.areaOfCopper + parseInt(area, 10);
    let newRoofsStolen = userInfo.roofsStolen ? userInfo.roofsStolen += 1 : 1;

    dispatch({type: 'UPDATING_USER_POINTS' })
    firebase.set(`users/${uid}`, {points: newUserPoints , areaOfCopper: newUserArea, roofsStolen: newRoofsStolen , team: userInfo.team})
    .then( () => {
        dispatch({type: 'USER_POINTS_UPDATED' })
        return Promise.resolve();
    })
    .then( () => {
        dispatch({type: 'UPDATING_STOLEN_ROOFS'})
        firebase.push('stolenRoofs', {roofId: id, userId: uid})
    })
    .then( () => {
        dispatch({type: 'STOLEN_ROOFS_UPDATED'})
    })
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
                        Price: {parseInt(props.price,10)} Area: {parseInt(props.area,10)}
                    </Modal.Body>

                    <Modal.Footer>
                            <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipLeave}>
                                <Button bsStyle="danger" bsSize="large" block onClick={() => props.dispatch(resetRoof())}>Leave</Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipSteal}>
                                <Button bsStyle="success" bsSize="large" block onClick={() => addRoof(props.firebase, props.uid, props.id, props.price, props.area, props.userInfo, props.dispatch)}>Steal</Button>
                            </OverlayTrigger>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>)
}

const mapStateToProps = (state, {auth}) => {
    return{
        userInfo: dataToJS(state.firebase, `users/${auth.uid}`),
        uid: auth.uid,
        id: state.copperRoof.id,
        price: state.copperRoof.value,
        area: state.copperRoof.area,

    }
}

const propsConnected = connect(mapStateToProps)(RoofInfo)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected