import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import { Button, Modal } from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions';

const GameStatisticsComponent = (props) => {

    var allRoofs = "10000";
    console.log("Stulna tak: ",props.stolenRoofs);
    
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
                    <h5>Total number of roofs: {allRoofs}</h5>
                    <h5>Number of roofs left: {allRoofs-roofsStolen}</h5>
                    <h5>Percent of roofs left: {((allRoofs-roofsStolen)/allRoofs)*100+"%"}</h5>
                    <br></br>
                    <h5>Numbers of roofs stolen by me: {props.auth.roofsStolen}</h5>
                    <h5>Percent of roofs stolen by me:</h5>
                    <br></br>
                    <h5>Current number of players: {numOfPlayers}</h5>
                    <h5>Daily copperprice:</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </div>
    )
}
//export default connect()(GameStatisticsComponent);

var wrappedUserInfo = firebaseConnect(
    ['/users', '/stolenRoofs']
)(GameStatisticsComponent);

export default connect(
    ({firebase}) => ({
        users: dataToJS(firebase, 'users'),
        stolenRoofs: dataToJS(firebase, 'stolenRoofs'),
        auth: pathToJS(firebase, 'auth')
    })
)(wrappedUserInfo);     
