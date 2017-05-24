import React from 'react';
import { connect } from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase'
import {resetRoof} from '../../Redux/Actions/copperMapActions';
import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import RoofInfoSnackbar from './RoofInfoSnackbar';
//import store from '../Redux/store';




const tooltipSteal = (
    <Tooltip id="tooltipSteal">Steal roof and add the current value to your account</Tooltip>
);

const tooltipLeave = (
    <Tooltip id="tooltipLeave">Leave roof in hopes that the value will increase</Tooltip>
);


class RoofInfo extends React.Component {
    constructor(props) {
        super();
        this.addRoof = this.addRoof.bind(this);
        this.addPoints = this.addPoints.bind(this);
        this.state={showSnackbar: false,
                    numberOfThieves: 0,
                    wait: false,
                    thievesAtRoof: 0,
                    ourRoof: null}
    }

    componentWillMount(){

        const area = this.props.area;

        if(area < 150){
            this.setState({numberOfThieves: 1})
        }else if(area >= 150 && area < 300){
            this.setState({numberOfThieves: 2})
        }else{
            this.setState({numberOfThieves: 1337})
        }
    }

    addPoints = (firebase, uid, id, price, area, userInfo, dispatch) => {
        let newUserPoints = userInfo.points + (parseInt(price, 10) / this.state.numberOfThieves) || parseInt(price, 10) / this.state.numberOfThieves;
        let newUserArea = userInfo.areaOfCopper + (parseInt(area, 10) / this.state.numberOfThieves) || parseInt(area, 10) / this.state.numberOfThieves;
        let newRoofsStolen = userInfo.roofsStolen ? userInfo.roofsStolen += 1 : 1;

        dispatch({type: 'UPDATING_USER_POINTS'})
        const newUserInfo = {...userInfo};
        newUserInfo.points = newUserPoints;
        newUserInfo.areaOfCopper = newUserArea;
        newUserInfo.roofsStolen = newRoofsStolen

        firebase.set(`users/${uid}`, {...newUserInfo})
            .then(() => {
                dispatch({type: 'USER_POINTS_UPDATED'})
                return Promise.resolve();
            })
            .then(() => {
                dispatch({type: 'UPDATING_STOLEN_ROOFS'})
                firebase.push('stolenRoofs', {roofId: id, userId: uid})

            })
            .then(() => {
                dispatch({type: 'STOLEN_ROOFS_UPDATED'})
            })
        this.setState({showSnackbar: true})

    }


    addRoof = (firebase, uid, id, price, area, userInfo, dispatch) => {
        if(this.state.numberOfThieves === 1) {
            this.addPoints(this.props.firebase, this.props.uid, this.props.id, this.props.price, this.props.area, this.props.userInfo, this.props.dispatch)
        } else {

            if(this.props.roofInProgress) {
                let newRoof = this.props.roofInProgress
                console.log("roof: "+newRoof)
                firebase.set(`roofsInProgress/${id}`, {count: 18000})
                console.log("ja")

            } else {
                firebase.set(`roofsInProgress/${id}`, {count: 1})
                console.log(this.props.roofInProgress)

            }

            this.setState({wait: true})
        }



    }



    render() {
        console.log(this.props.roofInProgress)
    if (!this.props.userInfo) {
        this.props.firebase.set(`users/${this.props.uid}`, {points: 0, areaOfCopper: 0, roofsStolen: 0, school: null, schoolClass: null})
        console.log("ASDASFASFASFSAFASFASFASFASFSFASFSAFASFSAFASFDASSFASFD")
        console.log(this.props.userInfo)
    }

    if (!this.props.roofInProgress) {
        this.props.firebase.set(`roofsInProgress/${this.props.id}`, {count: 1})
    }
    if(this.state.showSnackbar){
        return <RoofInfoSnackbar/>
    }
    if(this.state.wait) {


        if(this.state.thievesAtRoof === this.state.numberOfThieves) {
            this.addPoints(this.props.firebase, this.props.uid, this.props.id, this.props.price, this.props.area, this.props.userInfo, this.props.dispatch)
        }

        return(
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>WaITING</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Waiting
                    </Modal.Body>

                    <Modal.Footer>
                        <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipLeave}>
                            <Button bsStyle="danger" bsSize="large" block onClick={() => this.props.dispatch(resetRoof())}>Leave</Button>
                        </OverlayTrigger>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>

        )
    }


    return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Roof Found</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Price: {parseInt(this.props.price,10)} Area: {parseInt(this.props.area,10)} Thieves required: {this.state.numberOfThieves}
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
    console.log("ASSADNKLANSF    " +dataToJS(state.firebase, `users/${auth.uid}`))
    console.log("ASSADNKLANSF    " +dataToJS(state.firebase, `roofsInProgress/${state.copperRoof.id}`))
    return{
        userInfo: dataToJS(state.firebase, `users/${auth.uid}`),
        roofInProgress: dataToJS(state.firebase, `roofsInProgress/${state.copperRoof.id}`),
        uid: auth.uid,
        id: state.copperRoof.id,
        price: state.copperRoof.value,
        area: state.copperRoof.area

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