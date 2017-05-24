import React from 'react'
import ChatInputField from './ChatInputField'
import ChatHistory from "./ChatHistory";
import {Button, Modal} from 'react-bootstrap'
import {resetModal} from '../../Redux/Actions/navigationActions'
import {connect} from 'react-redux'
import * as pubnub from 'pubnub'

class ChatComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            userID: Math.round(Math.random() * 1000000).toString(),
            history: []
        };
    }

    componentDidMount(){
        this.PubNub = pubnub.init({
            publish_key: 'pub-c-425d3d2e-ad86-4961-bb14-1eb59efec74d',
            subscribe_key: 'sub-c-39bab7dc-3fcc-11e7-b6a4-02ee2ddab7fe',
            ssl: (location.protocol.toLowerCase() === 'https:'),
        });

        this.PubNub.subscribe({
            channel: 'CopperCrownChat',
            message: (message) => this.setState({
                history: this.state.history.concat(message)
            }),
        });
    }

    sendMessage = (message) => {
        this.PubNub.publish({
            channel: 'CopperCrownChat',
            message: message,
        });
    }

    render(){
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Chat Component</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1>ChatComponent</h1>
                        <ChatHistory history={this.state.history}/>
                        <ChatInputField userID={this.state.userID} sendMessage={this.sendMessage}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={() => this.props.dispatch(resetModal())}>OK</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default connect()(ChatComponent)


