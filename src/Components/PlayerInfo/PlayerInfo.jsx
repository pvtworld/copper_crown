import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { Button, Modal } from 'react-bootstrap';
import { List, ListItem } from 'material-ui';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import {red500} from 'material-ui/styles/colors';
import { resetModal } from '../../Redux/Actions/navigationActions'

const createRoofs = (roofs) => {
    const objectKeys = Object.keys(roofs);
    const array = Object.values(roofs);
    for (let i = 0; i < array.length; i++) { 
        (array[i]).firebaseId = objectKeys[i];
    }

    console.log(array)
    return array;
}

const removeRoof = (roof, firebase, dispatch, userInfo, uid) => () => {
    dispatch({type: 'UPDATING_STOLEN_ROOFS'})
    firebase.remove(`stolenRoofs/${roof.firebaseId}`)
    .then( () => {
        dispatch({type: 'STOLEN_ROOFS_UPDATED'})
        return Promise.resolve();
    }).then( () =>  {
    let newUserPoints = userInfo.points - parseInt(roof.points, 10) || parseInt(roof.points, 10) ;
    let newUserArea = userInfo.areaOfCopper - parseInt(roof.area, 10) || parseInt(roof.area, 10) ;
    let newRoofsStolen = userInfo.roofsStolen ? userInfo.roofsStolen -= 1 : 0;

    dispatch({type: 'UPDATING_USER_POINTS' })
    const newUserInfo = {...userInfo};
    newUserInfo.points = newUserPoints;
    newUserInfo.areaOfCopper = newUserArea;
    newUserInfo.roofsStolen =  newRoofsStolen

    firebase.update(`users/${uid}`, {...newUserInfo})
    })  
    .then( () => {
        dispatch({type: 'USER_POINTS_UPDATED' })
    })
    
}

const PlayerInfo = (props) => {
    
        return (
            <div>
        <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Stolen Roofs</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <List>
            {props.stolenRoofs ? 
            <div> 
                {
                createRoofs(props.stolenRoofs).map( roof => (<ListItem 
                                                            className="roof" key={roof.roofId} 
                                                            primaryText={`ID: ${(String(roof.roofId)).substring(1,9)}, Area: ${roof.area}, Points: ${roof.points}`} 
                                                            disabled={true} 
                                                            rightIcon={<DeleteForever 
                                                                        hoverColor={red500} 
                                                                        onClick={removeRoof(roof, props.firebase, props.dispatch, props.userInfo, props.auth.uid)}/>}> 
                                                            </ListItem>)) 
                }
            </div> 
                : <div> No roofs stolen </div>
            }
        </List>
      </Modal.Body>

      <Modal.Footer>
        <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>Close</Button>
      </Modal.Footer>

        </Modal.Dialog>
            </div>
        )
    }


const mapStateToProps = (state, {auth}) => {
    return{
        userInfo: dataToJS(state.firebase, `users/${auth.uid}`),
        stolenRoofs: dataToJS(state.firebase, `stolenRoofs`),
    }
}

const propsConnected = connect(mapStateToProps)(PlayerInfo)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `stolenRoofs#orderByChild=userId&equalTo=${auth.uid}`: '/', auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected

