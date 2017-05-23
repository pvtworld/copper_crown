import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import { Button, Modal } from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions';
import DeadlineClock from '../DeadlineClock/DeadlineClock'

const GameStatisticsComponent = (props) => {

    var allRoofs = "10000";
    console.log("Stulnaaaaaa tak: ",props);
    
    var roofArray =props.stolenRoofs? Object.keys(props.stolenRoofs): [];
    var roofsStolen = roofArray.length;

    var playerArray = props.users? Object.keys(props.users): [];
    var numOfPlayers = playerArray.length;

    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Game statistics</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>Game session ends in: </h5>
                    <DeadlineClock/>
                    <br></br>
                    <h5>Total number of roofs: {allRoofs}</h5>
                    <h5>Number of roofs left: {allRoofs-roofsStolen}</h5>
                    <h5>Percent of roofs left: {((allRoofs-roofsStolen)/allRoofs)*100+"%"}</h5>
                    <br></br>
                    <h5>Current number of players: {numOfPlayers}</h5>
                    <h5>Daily copperprice: {props.copperPrice > 0 ? props.copperPrice : "noll"}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </div>
    )
}


var wrappedUserInfo = firebaseConnect(
    ['/users', '/stolenRoofs']
)(GameStatisticsComponent);

const mapStateToProps = (state) => {
    return {
    users: dataToJS(state.firebase, 'users'),
    stolenRoofs: dataToJS(state.firebase, 'stolenRoofs'),
    auth: pathToJS(state.firebase, 'auth'),
    copperPrice: state.copperPrice.price

}};

export default connect(mapStateToProps)(wrappedUserInfo);
