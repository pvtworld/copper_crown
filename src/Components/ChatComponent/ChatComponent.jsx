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
import { setUserAuthID, addMessageToList, addHistoryToList } from './ChatActions'

class ChatComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            photoURL: this.props.auth.photoURL,
            isToggled: true
        };
    }

    pubNub = null;

    componentDidMount(){
        this.props.setAuthID(this.props.auth.uid);
        this.pubNub = pubnub.init({
            publish_key: 'pub-c-425d3d2e-ad86-4961-bb14-1eb59efec74d',
            subscribe_key: 'sub-c-39bab7dc-3fcc-11e7-b6a4-02ee2ddab7fe',
            ssl: (location.protocol.toLowerCase() === 'https:'),
        });

        this.pubNub.subscribe({
            channel: 'CopperCrownChat',
            message: this.props.addMessage,
            presence: this.handleChatPresence
        });

        this.fetchHistory();
    }

    componentWillUnmount(){
        this.leaveCrownChat()
    }

    handleToggleState = () => {
        this.setState({
            isToggled: false,
            photoURL: ''
        })

        if(this.state.isToggled === false){
            this.setState({
                isToggled: true,
                photoURL: this.props.auth.photoURL
            })
        }
    }

    fetchHistory = () => {
        this.pubNub.history({
            channel: 'CopperCrownChat',
            count: 15,
            start: this.props.lastMessageTimestamp,
            callback: (data) => {
                this.props.addMessageHistory(data[0], data[1]);
            },
        });
    }

    handleChatPresence = (newPresenceData) => {
        console.log('inside handleChatPresence');
        switch (newPresenceData.action) {
            case 'join':
                console.log('INSIDE JOIN CONCATINATES presenceData');
/*                this.setState({
                    userOnline: this.state.userOnline.concat(newPresenceData.uuid)
                });*/
                break;
            case 'leave':
                console.log('INSIDE LEAVE FILTERS')
                this.leaveCrownChat();
                break;
            case 'timeout':
                console.log('INSIDE TIMEOUT FILTERS')
                this.leaveCrownChat();
                break;
            default:
                console.log('unknown action: ' + newPresenceData.action);
        }
    }

    leaveCrownChat = () => {
        this.pubNub.unsubscribe({ channel: 'CopperCrownChat' });
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
                        <IconButton onTouchTap={this.props.resetModal}>
                            <Close color={red500}
                                   hoverColor={red900}/>
                        </IconButton>
                        </div>
                        <Modal.Title>Chat Component new <p>Users online: 0</p> </Modal.Title>
                        <Toggle label="Let other users see my profile picture"
                                defaultToggled={this.state.isToggled}
                                style={{maxWidth: 300}}
                                onToggle={this.handleToggleState}
                        />
                    </Modal.Header>

                    <Modal.Body>
                        <ChatHistory fetchHistory={this.fetchHistory}
                                     history={this.props.history}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <ChatInputField photoURL={this.state.photoURL}
                                        userID={this.props.userID}
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
        auth: pathToJS(state.firebase, 'auth'),
        history: state.chat.get('messages').toJS(),
        userID: state.chat.get('userID'),
        lastMessageTimestamp: state.chat.get('lastMessageTimestamp'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetModal: () => dispatch(resetModal()),
        addMessage: (newMessage) => dispatch(addMessageToList(newMessage)),
        setAuthID: (authID) => dispatch(setUserAuthID(authID)),
        addMessageHistory: (messages, timestamp) => dispatch(addHistoryToList(messages, timestamp)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent)


