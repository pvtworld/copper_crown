import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions'

const PlayerInfo = (props) => {

        const back = <Button bsStyle="primary" onClick={() => props.dispatch(resetModal())}>Close</Button>;

        return (
            <div className="navpage-box">
                <h1>PlayerInfo Component</h1>
                {back}
                <ListGroup>
                    <ListGroupItem bsStyle="success">PlayerID: {props.auth.uid} </ListGroupItem>
                    <ListGroupItem bsStyle="info">Value of copper stolen: {props.userInfo.points || 0 + ' kr'}</ListGroupItem>
                    <ListGroupItem bsStyle="warning">Area of copper stolen: {props.userInfo.areaOfCopper || 0 + ' cm2'}</ListGroupItem>
                </ListGroup>
            </div>
        )
    }

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(PlayerInfo)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected;