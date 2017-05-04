import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default class PlayerInfo extends Component {


    render() {

        return (
            <div>
            <ListGroup>
                <ListGroupItem bsStyle="success">PlayerID: {this.props.state.uid} </ListGroupItem>
                <ListGroupItem bsStyle="info">Value of copper stolen: {(this.props.state.userInfo.points || 0) + ' kr'}</ListGroupItem>
                <ListGroupItem bsStyle="warning">Area of copper stolen: {(this.props.state.userInfo.areaOfCopper || 0) + ' kvm'}</ListGroupItem>
            </ListGroup>
            </div>
        );

    }


}


