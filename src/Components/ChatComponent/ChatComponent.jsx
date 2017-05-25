import React from 'react'
import ChatInputField from './ChatInputField'
import ChatHistory from "./ChatHistory";
import { Button, Modal } from 'react-bootstrap'
import { resetModal } from '../../Redux/Actions/navigationActions'
import { connect } from 'react-redux'
import * as pubnub from 'pubnub'
import { pathToJS } from 'react-redux-firebase'

class ChatComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userID: props.auth.uid,
            history: []
        };
    }

    pubNub = null;

    componentDidMount(){
        this.pubNub = pubnub.init({
            publish_key: 'pub-c-425d3d2e-ad86-4961-bb14-1eb59efec74d',
            subscribe_key: 'sub-c-39bab7dc-3fcc-11e7-b6a4-02ee2ddab7fe',
            ssl: (location.protocol.toLowerCase() === 'https:'),
        });

        this.pubNub.subscribe({
            channel: 'CopperCrownChat',
            message: (message) => this.setState({
                history: this.state.history.concat(message)
            }),
        });
    }

    componentWillUnmount(){
        this.pubNub.unsubscribe({
            channel: 'CopperCrownChat'
        })
    }

    sendMessage = (message) => {
        this.pubNub.publish({
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

const mapStateToProps = (state, {auth}) => {
    return {
        auth: pathToJS(state.firebase, 'auth')
    }
}

export default connect(mapStateToProps)(ChatComponent)


