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

const removeRoof = (roof,firebase) => () => {
    firebase.remove(`stolenRoofs/${roof.firebaseId}`)
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
                createRoofs(props.stolenRoofs).map( roof => (<ListItem className="roof" key={roof.roofId} primaryText={roof.roofId} disabled={true} rightIcon={<DeleteForever hoverColor={red500} onClick={removeRoof(roof, props.firebase)}/>}> </ListItem>)) 
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


const mapStateToProps = (state) => {
    return{
        stolenRoofs: dataToJS(state.firebase, `stolenRoofs`),
    }
}

const propsConnected = connect(mapStateToProps)(PlayerInfo)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `stolenRoofs#orderByChild=userId&equalTo=${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected

