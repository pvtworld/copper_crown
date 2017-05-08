import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS } from 'react-redux-firebase';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class PlayerInfo extends Component {
    render() {

        const back = <Button bsStyle="primary" onClick={this.props.leavePlayerInfo}>Close</Button>;

        if(this.props.renderPlayerInfo){
            return (
                <div className="navpage-box">
                    <h1>PlayerInfo Component</h1>
                    {back}
                    <ListGroup>
                        <ListGroupItem bsStyle="success">PlayerID: {this.props.state.uid} </ListGroupItem>
                        <ListGroupItem bsStyle="info">Value of copper stolen: {this.props.state.userInfo.points || 0 + ' kr'}</ListGroupItem>
                        <ListGroupItem bsStyle="warning">Area of copper stolen: {this.props.state.userInfo.areaOfCopper || 0 + ' cm2'}</ListGroupItem>
                    </ListGroup>
                </div>
            )
        }
        return null;
    }
}




const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(PlayerInfo)

const firebaseConnected = firebaseConnect(
  ({ auth }) => ([
    
    // Get auth from props
    auth ? `users/${auth.uid}` : '/stolenRoofs'
  ])
)(authConnected)

export default connect(
 ({ firebase }, { auth }) => ({
    // pathToJS(firebase, 'auth') gets from redux, but auth is already a prop
    userID: dataToJS(firebase, auth ? `users/${auth.uid}` : '/stolenRoofs')
 })
)(firebaseConnected)
