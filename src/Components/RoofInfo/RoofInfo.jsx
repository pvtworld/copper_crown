import React, {Component} from 'react';
import {Button, Tooltip, OverlayTrigger, Grid, Col, Row} from 'react-bootstrap';

const tooltipSteal = (
    <Tooltip id="tooltipSteal">Steal roof and add the current value to your account</Tooltip>
);

const tooltipLeave = (
    <Tooltip id="tooltipLeave">Leave roof in hopes that the value will increase</Tooltip>
);

export default class RoofInfo extends Component {

    steal = this.steal.bind(this);
    leave = this.leave.bind(this);


    steal() {
        this.props.stealCallback(this.props.value, (this.props.area), this.props.id);
    }

    leave() {
        var leaveFunc = this.props.leaveCallback;
        leaveFunc(null);

    }

    render() {
        return (
            <div className="container" style={{background: '#ff943e'}}>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={3} className="text-right"><h4>RoofID:</h4></Col>
                        <Col xs={2} md={5} className="text-left"><h4>{this.props.id}</h4></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1} md={3} className="text-right"><h4>Current value:</h4></Col>
                        <Col xs={2} md={3} className="text-left"><h4>{this.props.value} kr</h4></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1} md={3} className="text-right"><h4>Area:</h4></Col>
                        <Col xs={2} md={3} className="text-left"><h4>{this.props.area} kvm</h4></Col>
                    </Row>

                    <Row className="show-grid">
                        <Col md={6} mdPush={6}>
                            <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipLeave}>
                                <Button bsStyle="danger" bsSize="large" block onClick={this.leave}>Leave</Button>
                            </OverlayTrigger>
                        </Col>
                        <Col md={6} mdPull={6}>
                            <OverlayTrigger placement="top" delayShow={1000} overlay={tooltipSteal}>
                                <Button bsStyle="success" bsSize="large" block onClick={this.steal}>Steal</Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }


}


