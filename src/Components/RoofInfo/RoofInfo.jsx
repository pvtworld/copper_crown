import React, {Component} from 'react';
import {Button, Tooltip, OverlayTrigger, Grid, Col, Row} from 'react-bootstrap';

const tooltipSteal =(
    <Tooltip id="tooltipSteal">Steal roof and add value to your account!</Tooltip>
);

const tooltipLeave = (
    <Tooltip id="tooltipLeave">Leave roof alone!</Tooltip>
);

var callbackFunc;

export default class RoofInfo extends Component {
    constructor(props){
        super(props)
        callbackFunc = this.props.callback;
    }

    steal(){
        console.log('STOLE ROOF!!!');
    }

    leave(){
        callbackFunc(null);

    }


    render() {

        return (

            <div className="container" style={{backgroundColor:'#F6BB42'}}>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={1} md={1} className="text-right"><strong>Roof ID:</strong></Col>
                        <Col xs={2} md={5} className="text-left">{this.props.id}</Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1} md={1} className="text-right"><strong>Value:</strong></Col>
                        <Col xs={2} md={3} className="text-left">{this.props.value}</Col>
                    </Row>

                    <Row className="show-grid">
                        <Col xs={1} md={1} className="text-right"><strong>Area:</strong></Col>
                        <Col xs={2} md={3} className="text-left">{this.props.area}</Col>
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


