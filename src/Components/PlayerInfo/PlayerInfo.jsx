import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default class PlayerInfo extends Component {


    render() {

        return (
            <div>
            <ListGroup>
                <ListGroupItem bsStyle="success">PlayerID: {this.props.state.uid} </ListGroupItem>
                <ListGroupItem bsStyle="info">Value of copper stolen: {this.props.state.userInfo.points + 'kr'}</ListGroupItem>
                <ListGroupItem bsStyle="warning">Area of copper stolen: NaN</ListGroupItem>
            </ListGroup>
            </div>
        );

    }


}


