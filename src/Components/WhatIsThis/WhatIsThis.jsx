import React from 'react';
import { IconButton } from 'material-ui';
import { Modal } from 'react-bootstrap';
import {red500, red900} from 'material-ui/styles/colors';
import Close from 'material-ui/svg-icons/navigation/close';

class WhatIsThis extends React.Component {

    render () {
        return (
            <div className="static-modal">
                <Modal show={this.props.showModal} onHide={this.props.handleClose}>
                    <Modal.Header>
                        <div className="floating-right">
                            <IconButton onClick={this.props.onClose}>
                                <Close color={red500}
                                       hoverColor={red900}/>
                            </IconButton>
                        </div>
                        <Modal.Title>What is this?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>CopperCrown is a mobile app built to provide a fun and interesting experience using the open
                        data provided by Stockholm City Municipality. Our app includes social media interaction through
                        our in-game chat, is mobile and accessible as a progressive web app and provides an experience
                            to interact with one of Stockholm's cultural treasures, a treasure not easily discovered…</p>

                        <p>CopperCrown requires:</p>
                        <p>An active internet connection & GPS device.</p>
                        <p>Permission to access your device GPS location.</p>

                        <p>Users are able to delete the GPS data we store.</p>

                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

export default WhatIsThis;