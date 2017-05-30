import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { Modal } from 'react-bootstrap';
import Close from 'material-ui/svg-icons/navigation/close';
import { IconButton, List, ListItem } from 'material-ui';
import Home from 'material-ui/svg-icons/action/home';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import {red500, red900} from 'material-ui/styles/colors';
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
    let newUserPoints = userInfo.points - roof.pointsPerUser;
    let newUserArea = userInfo.areaOfCopper - roof.areaPerUser;
    let newRoofsStolen = userInfo.roofsStolen - 1;

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
        if(props.requestingStoolenRoofs){
            return <div/>
        }
        return (
            <div>
        <Modal.Dialog dialogClassName="full-modal">
      <Modal.Header>
            <div className="floating-right">
                        <IconButton onClick={() => props.dispatch(resetModal())}>
                            <Close color={red500}
                                   hoverColor={red900}/>
                        </IconButton>
                        </div>
        <Modal.Title>Stolen Roofs</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <List>
            {props.stolenRoofs ? 
            <div> 
                {
                createRoofs(props.stolenRoofs).map( roof => (<ListItem 
                                                            className="roof" key={roof.roofId} 
                                                            leftIcon={<Home/>}
                                                            primaryText={`ID: ${(String(roof.roofId)).substring(1,9)}, Area: ${roof.areaPerUser} sqm, Value: ${roof.pointsPerUser}`}
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

        </Modal.Dialog>
            </div>
        )
    }


const mapStateToProps = (state, {auth}) => {
    return{
        userInfo: dataToJS(state.firebase, `users/${auth.uid}`),
        stolenRoofs: dataToJS(state.firebase, `stolenRoofs`),
        requestingStoolenRoofs: pathToJS(state.firebase, 'requesting/stolenRoofs')
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



