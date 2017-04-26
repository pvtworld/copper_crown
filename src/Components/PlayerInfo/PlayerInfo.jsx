import React, {Component} from 'react';
import {Grid, Col, Row} from 'react-bootstrap';

export default class PlayerInfo extends Component {


    render() {

        return (

            <div className="container">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={3} className="text-right"><h4>PlayerID:</h4></Col>
                        <Col xs={2} md={3} className="text-left"><h4>{this.props.state.uid}</h4></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1} md={3} className="text-right"><h4>Value of copper stolen:</h4></Col>
                        <Col xs={2} md={3} className="text-left"><h4>{this.props.state.userInfo.points + 'kr'}</h4></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1} md={3} className="text-right"><h4>Area of copper stolen:</h4></Col>
                        <Col xs={2} md={3} className="text-left"><h4>NaN</h4></Col>
                    </Row>
                </Grid>
            </div>
        );
    }


}


