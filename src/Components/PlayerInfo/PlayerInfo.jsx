import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export default class PlayerInfo extends Component {
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


