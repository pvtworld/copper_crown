import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

export default class LeaderboardItem extends Component {
    render(){
        var {pos, name, points} = this.props;
        return (
            <Row>
                <Col xs={1} sm={1} md={1}>{pos.toString()}</Col>
                <Col xs={6} sm={4} md={2}>{name}</Col>
                <Col xs={5} sm={7} md={9}>{points}</Col>
            </Row>
        );
    }
}