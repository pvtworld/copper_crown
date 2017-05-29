import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Close from 'material-ui/svg-icons/navigation/close';
import { IconButton, Card, CardHeader, CardText } from 'material-ui';
import {red500, red900} from 'material-ui/styles/colors';
import { resetModal } from '../Redux/Actions/navigationActions';

class Help extends React.Component {

render(){
    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                        <div className="floating-right">
                        <IconButton onClick={() => this.props.dispatch(resetModal())}>
                            <Close color={red500}
                                   hoverColor={red900}/>
                        </IconButton>
                        </div>
                    <Modal.Title>How to play</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: 400, overflow: 'auto'}}>
                        <Card>
                            <CardHeader
                                title="Goal"
                                subtitle="Goal of the game"
                                actAsExpander={true}
                                showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            The goal of CopperCrown is to reach a score as high as possible which is done by stealing copper roofs.
                        </CardText>
                        </Card>
                        <Card>
                            <CardHeader
                                title="Play"
                                subtitle="How to play"
                                actAsExpander={true}
                                showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            You see your position centered on the map marked as a raccon. 
                            The circle around you indicates your range; if a roof is outside your radius you need to move to be able to steal it. 
                            Press a position on the map to check whether it contains a copper roof or not. 
                        </CardText>
                        </Card>
                        <Card>
                            <CardHeader
                                title="Roofs"
                                subtitle="How to steal a roof"
                                actAsExpander={true}
                                showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            If a copper roof is present and not already stolen by another player you will be presented with the option to steal or leave it. 
                            Else a bar will appear telling the roof is not a copper roof.
                        </CardText>
                        </Card>
                        <Card>
                            <CardHeader
                                title="Teamplay"
                                subtitle="Steal roofs together"
                                actAsExpander={true}
                                showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            Some roofs are too big for one person alone to steal, to claim these roofs you will have to gather some teamates.
                        </CardText>
                        </Card>

                        <Card>
                            <CardHeader
                                title="Chat"
                                subtitle="Talk with other players"
                                actAsExpander={true}
                                showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            Use the global chat to reach other players to get help to steal the roof.
                            Remember, be nice to other players!
                        </CardText>
                        </Card>
                        <Card>
                            <CardHeader
                                title="Game time"
                                subtitle="See the remaining game time"
                                actAsExpander={true}
                                showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                            CopperCrown is a time boxed game. The time limit for the game can be seen under statistics. 
                        </CardText>
                        </Card>
                     
                    
                </Modal.Body>

            </Modal.Dialog>
        </div>
);}}

export default connect()(Help);