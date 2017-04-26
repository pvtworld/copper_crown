import React, {Component} from 'react';
import {Grid, Col, Row} from 'react-bootstrap';

export default class PlayerInfo extends Component {


    render() {

        return (

            <div className="container">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={2} className="text-right"><strong>Player:</strong></Col>
                        <Col xs={2} md={3} className="text-left"></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1} md={2} className="text-right"><strong>Total Value:</strong></Col>
                        <Col xs={2} md={3} className="text-left">{this.props.state.userInfo.points}</Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1} md={2} className="text-right"><strong>Total Area:</strong></Col>
                        <Col xs={2} md={3} className="text-left"></Col>
                    </Row>
                </Grid>
            </div>
        );
    }


}


