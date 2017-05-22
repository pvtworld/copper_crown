import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import { Button, Modal } from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions';

const GameStatisticsComponent = (props) => {

/*    
    var countPercentOfAllRoofs = (numberOfRoofs) =>{ //Total % of roofs stolen
       return{ 
           (numberOfRoofs/allRoofs)*100
       }
            }

    var countPercentofStolenRoofs = (numberOfRoofs) =>{ //Can count % of roofs stolen by team
        return{
            (numberOfRoofs/TotalRoofsStolen)*100
        }
    
    var personalContribution = (myRoofs) =>{
        return{
            (myRoofs/teamsRoofs)*100
        }
    }
*/

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
                    <h5>Numbers of roofs stolen by me:</h5>
                    <h5>Percent of roofs stolen by me:</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </div>
    )
}
export default connect()(GameStatisticsComponent);
