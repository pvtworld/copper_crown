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
        this.leaveRoof = this.leaveRoof.bind(this);
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
        this.setState({wait: false})
        this.setState({showSnackbar: true})

    }


    addRoof = (firebase, uid, id, price, area, userInfo, dispatch) => {
        if(this.state.numberOfThieves === 1) {
            this.addPoints(this.props.firebase, this.props.uid, this.props.id, this.props.price, this.props.area, this.props.userInfo, this.props.dispatch)
        } else {

            if(this.props.roofInProgress) {
                let newCount = this.props.roofInProgress.count + 1
                firebase.set(`roofsInProgress/${id}`, {count: newCount})

            } else {
                firebase.set(`roofsInProgress/${id}`, {count: 1})

            }

            this.setState({wait: true})
        }

    }

    leaveRoof= () => {
        let newCount = this.props.roofInProgress.count -1
        this.props.firebase.set(`roofsInProgress/${this.props.id}`, {count: newCount})
        if(newCount === 0) {
            this.props.firebase.set(`roofsInProgress/${this.props.id}`, {})
        }
        this.setState({wait: false})

        this.props.dispatch(resetRoof())
    }



    render() {
    if (!this.props.userInfo) {
        this.props.firebase.set(`users/${this.props.uid}`, {points: 0, areaOfCopper: 0, roofsStolen: 0, school: null, schoolClass: null})
    }
    if(this.state.showSnackbar){
        return <RoofInfoSnackbar/>
    }
    if(this.state.wait) {
        if(this.props.roofInProgress.count === this.state.numberOfThieves) {
            this.addPoints(this.props.firebase, this.props.uid, this.props.id, this.props.price, this.props.area, this.props.userInfo, this.props.dispatch)
        }

        return(
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Waiting for more thieves</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        You need {this.state.numberOfThieves} thieves present
                        Currently {this.props.roofInProgress.count} thieves at roof
                    </Modal.Body>

                    <Modal.Footer>
                        <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipLeave}>
                            <Button bsStyle="danger" bsSize="large" block onClick={this.leaveRoof}>Leave</Button>
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
    ({auth}) => ([auth ? `users/${auth.uid}` : '/',  '/roofsInProgress']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected