import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { resetModal } from '../Redux/Actions/navigationActions';

export default class Help extends React.Component {

render(){
    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>How to play</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    The goal of CopperCrown is to reach a score as high as possible which is done by stealing copper roofs. 
                    You see your position centered on the map marked as a raccon. The circle around you indicates your range; if a roof is outside your radius you need to move to be able to steal it. 
                    Press a position on the map to check whether it contains a copper roof or not. 
                    If a copper roof is present and not already stolen by another player you will be presented with the option to steal or leave it. 
                    Else a bar will appear telling the roof is not a copper roof. Some roofs are too big for one person alone to take and this forces cooperation. 
                    Use the global chat to reach other players to get help to steal the roof.  
                    <br/>
                    CopperCrown is a time boxed game. The time limit for the game can be seen under statistics. 
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => this.props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

            </Modal.Dialog>
        </div>
    );}}