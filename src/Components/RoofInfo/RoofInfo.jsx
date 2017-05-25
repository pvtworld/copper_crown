import React from 'react';
import { connect } from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase'
import {resetRoof} from '../../Redux/Actions/copperMapActions';
import {Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import RoofInfoSnackbar from './RoofInfoSnackbar';




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
        this.changeRoofCount = this.changeRoofCount.bind(this);
        this.state={showSnackbar: false,
                    numberOfThieves: 0,
                    wait: false,
                    thievesAtRoof: 0,
                    ourRoof: null}
    }

    componentWillMount() {

        const area = this.props.area;
        let thieves;

        if (area < 150) {
            thieves = 1;
        } else if (area >= 150 && area < 300) {
            thieves = 2;
        } else if (area >= 300 && area < 400) {
            thieves = 3;
        } else if (area >= 400 && area < 500) {
            thieves = 4;
        } else if (area >= 500 && area < 600) {
            thieves = 5;
        } else if (area >= 600 && area < 700) {
            thieves = 6;
        } else if (area >= 700 && area < 800) {
            thieves = 7;
        } else {
            thieves = 8;
        }

        this.setState({numberOfThieves: thieves})
    }

    addPoints = () => {
        let newPoints = Math.round(this.props.price / this.state.numberOfThieves);
        let newArea = Math.round(this.props.area / this.state.numberOfThieves);

        let newUserPoints = this.props.userInfo.points + newPoints;
        let newUserArea = this.props.userInfo.areaOfCopper + newArea;

        let newRoofsStolen = this.props.userInfo.roofsStolen + 1;

        this.props.dispatch({type: 'UPDATING_USER_POINTS'})
        const newUserInfo = {...this.props.userInfo};
        newUserInfo.points = newUserPoints;
        newUserInfo.areaOfCopper = newUserArea;
        newUserInfo.roofsStolen = newRoofsStolen

        this.props.firebase.set(`users/${this.props.uid}`, {...newUserInfo})
            .then(() => {
                this.props.dispatch({type: 'USER_POINTS_UPDATED'})
                return Promise.resolve();
            })
            .then(() => {
                this.props.dispatch({type: 'UPDATING_STOLEN_ROOFS'})
                this.props.firebase.push('stolenRoofs', {roofId: this.props.id, userId: this.props.uid, pointsPerUser: newPoints, areaPerUser: newArea })

            })
            .then(() => {
                this.props.dispatch({type: 'STOLEN_ROOFS_UPDATED'})
            })
        this.setState({wait: false})
        this.setState({showSnackbar: true})

    }


    addRoof = () => {
        if(this.state.numberOfThieves === 1) {
            this.addPoints()

        } else {
            if(this.props.roofInProgress) {
                this.changeRoofCount(1);

            } else {
                this.props.dispatch({type: 'CREATING_ROOF_IN_PROGRESS'})
                this.props.firebase.set(`roofsInProgress/${this.props.id}`, {count: 1})
                    .then(() => {
                        this.props.dispatch({type: 'CREATED_ROOF_IN_PROGRESS'})
                        return Promise.resolve();
                    })

            }

            this.setState({wait: true})
        }
    }

    leaveRoof= () => {
        this.changeRoofCount(-1)
        this.setState({wait: false})
        this.props.dispatch(resetRoof())
    }

    changeRoofCount = (value) => {
        let newCount = this.props.roofInProgress.count + value
        this.props.dispatch({type: 'CHANGING_USER_AT_ROOF_COUNT'})
        this.props.firebase.set(`roofsInProgress/${this.props.id}`, {count: newCount})
            .then(() => {
                this.props.dispatch({type: 'CHANGED_USERS_AT_ROOF_COUNT'})
                return Promise.resolve();
            })

        if(newCount === 0) {
            this.props.dispatch({type: 'DELETING_ROOF_IN_PROGRESS'})
            this.props.firebase.set(`roofsInProgress/${this.props.id}`, {})
                .then(() => {
                    this.props.dispatch({type: 'DELETED_ROOF_IN_PROGRESS'})
                    return Promise.resolve();
                })
        }
    }



    render() {

    if(this.state.showSnackbar){
        return <RoofInfoSnackbar/>
    }
    if(this.state.wait) {
        if(this.props.roofInProgress.count === this.state.numberOfThieves) {
            this.addPoints()
            this.changeRoofCount(-1)

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
                                <Button bsStyle="success" bsSize="large" block onClick={() => this.addRoof()}>Steal</Button>
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