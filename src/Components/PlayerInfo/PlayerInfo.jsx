import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class PlayerInfo extends Component {
    render() {
        console.log(this.props.auth.uid);
        console.log(this.props.userInfo);
        const back = <Button bsStyle="primary" onClick={this.props.leavePlayerInfo}>Close</Button>;

        if(this.props.renderPlayerInfo){
            return (
                <div className="navpage-box">
                    <h1>PlayerInfo Component</h1>
                    {back}
                    <ListGroup>
                        <ListGroupItem bsStyle="success">PlayerID: {this.props.auth.uid} </ListGroupItem>
                        <ListGroupItem bsStyle="info">Value of copper stolen: {this.props.userInfo.points || 0 + ' kr'}</ListGroupItem>
                        <ListGroupItem bsStyle="warning">Area of copper stolen: {this.props.userInfo.areaOfCopper || 0 + ' cm2'}</ListGroupItem>
                    </ListGroup>
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(PlayerInfo)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))
    (propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected;