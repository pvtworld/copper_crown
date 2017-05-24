import React from 'react';
import { connect } from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase'
import {resetRoof} from '../../Redux/Actions/copperMapActions';
import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import RoofInfoSnackbar from './RoofInfoSnackbar'


const tooltipSteal = (
    <Tooltip id="tooltipSteal">Steal roof and add the current value to your account</Tooltip>
);

const tooltipLeave = (
    <Tooltip id="tooltipLeave">Leave roof in hopes that the value will increase</Tooltip>
);



class RoofInfo extends React.Component {
    constructor(props) {
        super()
        this.addRoof = this.addRoof.bind(this);

        this.state={showSnackbar: false}
    }


    addRoof = (firebase, uid, id, price, area, userInfo, dispatch) => {

    let newUserPoints = userInfo.points + parseInt(price, 10) || parseInt(price, 10) ;
    let newUserArea = userInfo.areaOfCopper + parseInt(area, 10) || parseInt(area, 10) ;
    let newRoofsStolen = userInfo.roofsStolen ? userInfo.roofsStolen += 1 : 1;

    dispatch({type: 'UPDATING_USER_POINTS' })
    const newUserInfo = {...userInfo};
    newUserInfo.points = newUserPoints;
    newUserInfo.areaOfCopper = newUserArea;
    newUserInfo.roofsStolen =  newRoofsStolen

    firebase.set(`users/${uid}`, {...newUserInfo})
    .then( () => {
        dispatch({type: 'USER_POINTS_UPDATED' })
        return Promise.resolve();
    })
    .then( () => {
        dispatch({type: 'UPDATING_STOLEN_ROOFS'})
        firebase.push('stolenRoofs', {roofId: id, userId: uid, points: parseInt(price, 10), area: parseInt(area,10)})
    })
    .then( () => {
        dispatch({type: 'STOLEN_ROOFS_UPDATED'})
    })
    this.setState({showSnackbar: true})
    }


    render() {
    if (!this.props.userInfo) {
        this.props.firebase.set(`users/${this.props.uid}`, {points: 0, areaOfCopper: 0, roofsStolen: 0, school: null, schoolClass: null})
    }
    if(this.state.showSnackbar){
        return <RoofInfoSnackbar/>
    }

    return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Roof Found</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Price: {parseInt(this.props.price,10)} Area: {parseInt(this.props.area,10)}
                    </Modal.Body>

                    <Modal.Footer>
                            <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipLeave}>
                                <Button bsStyle="danger" bsSize="large" block onClick={() => this.props.dispatch(resetRoof())}>Leave</Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipSteal}>
                                <Button bsStyle="success" bsSize="large" block onClick={() => this.addRoof(this.props.firebase, this.props.uid, this.props.id, this.props.price, this.props.area, this.props.userInfo, this.props.dispatch)}>Steal</Button>
                            </OverlayTrigger>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>)
    }   
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