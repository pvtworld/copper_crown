import React from 'react'
import ChatInputField from './ChatInputField'
import ChatHistory from "./ChatHistory";
import { Modal } from 'react-bootstrap'
import { resetModal } from '../../Redux/Actions/navigationActions'
import { connect } from 'react-redux'
import * as pubnub from 'pubnub'
import { pathToJS } from 'react-redux-firebase'
import Toggle from 'material-ui/Toggle';
import './ChatInput.css'
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import { red500 } from 'material-ui/styles/colors';
import { red900 } from 'material-ui/styles/colors'


class ChatComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userID: props.auth.uid,
            history: [],
            photoURL: '',
            isToggled: false
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

    handleToggleState = () => {

    }

    changePhotoURL = () => {

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
                        <div className="floating-right">
                        <IconButton onTouchTap={() => this.props.dispatch(resetModal())}>
                            <Close color={red500}
                                   hoverColor={red900}/>
                        </IconButton>
                        </div>
                        <Modal.Title>Chat Component</Modal.Title>
                        <Toggle label="Show profile picture"
                                defaultToggled={this.state.isToggled}
                                style={{maxWidth: 200}}
                                onToggle={this.changePhotoURL}
                        />
                    </Modal.Header>

                    <Modal.Body>
                        <ChatHistory history={this.state.history}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <ChatInputField userID={this.state.userID}
                                        sendMessage={this.sendMessage}
                        />
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


