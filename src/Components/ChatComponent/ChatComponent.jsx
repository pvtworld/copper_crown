import React from 'react'
import ChatInputField from './ChatInputField'
import ChatHistory from "./ChatHistory";
import { Modal } from 'react-bootstrap'
import { resetModal } from '../../Redux/Actions/navigationActions'
import { connect } from 'react-redux'
import * as pubnub from 'pubnub'
import { pathToJS, dataToJS, firebaseConnect } from 'react-redux-firebase'
import Toggle from 'material-ui/Toggle';
import './ChatInput.css'
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui/svg-icons/navigation/close';
import { red500, red900, orange200 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { setUserAuthID, addMessageToList, addHistoryToList, removeUserFromOnlineList, addUserToOnlineList, showProfilePicture, setProfilePicture } from './ChatActions'

class ChatComponent extends React.Component{

    pubNub = null;

    componentDidMount(){
        this.props.setAuthID(this.props.auth.uid);
        this.props.setProfilePictureURL(this.props.auth.photoURL);
        this.pubNub = pubnub.init({
            publish_key: 'pub-c-425d3d2e-ad86-4961-bb14-1eb59efec74d',
            subscribe_key: 'sub-c-39bab7dc-3fcc-11e7-b6a4-02ee2ddab7fe',
            ssl: (location.protocol.toLowerCase() === 'https:'),
            uuid: this.props.auth.uid
        });

        this.pubNub.subscribe({
            channel: 'CopperCrownChat',
            message: this.props.addMessage,
            presence: this.handleChatPresence
        });

        this.fetchHistory();

        window.addEventListener('beforeunload', this.leaveCrownChat);
    }

    componentWillUnmount(){
        this.leaveCrownChat()
    }

    handleToggleState = () => {

        this.props.setProfilePictureURL(this.props.auth.photoURL);
        this.props.setProfilePictureInChat(true);

        if(this.props.showProfilePicture === true){
            this.props.setProfilePictureInChat(false);
            this.props.setProfilePictureURL('');
        }
    }

    fetchHistory = () => {
        this.pubNub.history({
            channel: 'CopperCrownChat',
            count: 10,
            start: this.props.lastMessageTimestamp,
            callback: (newData) => {
                this.props.addMessageHistory(newData[0], newData[1]);
            },
        });
    }

    handleChatPresence = (newPresenceData) => {
        switch (newPresenceData.action) {
            case 'join':
                this.props.addUserToList(newPresenceData.uuid);
                break;
            case 'leave':
                this.props.removeUserFromList(newPresenceData.uuid);
                break;
            case 'timeout':
                this.props.removeUserFromList(newPresenceData.uuid);
                break;
            default:
                return null;
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
                <Modal.Dialog dialogClassName="full-modal">
                    <Modal.Header>
                        <div className="floating-right">
                        <IconButton onClick={this.props.resetModal}>
                            <Close color={red500}
                                   hoverColor={red900}/>
                        </IconButton>
                        </div>
                        <Modal.Title>Chat <p style={{color: '#6f6f6f', fontSize: '13px', marginTop: '5px'}}>Users in chat: {this.props.usersInChat.length}</p> </Modal.Title>

                        <Toggle label="Profile picture visible"
                                defaultToggled={this.props.showProfilePicture}
                                style={{maxWidth: 200}}
                                onToggle={this.handleToggleState}
                        />

                        <Chip style={{marginTop: 10, marginBottom: 15}}
                              backgroundColor={orange200}>
                            <Avatar src={this.props.profilePictureURL} />
                            {this.props.userInfo.username}
                        </Chip>

                    </Modal.Header>

                    <Modal.Body>
                        <ChatHistory fetchHistory={this.fetchHistory}
                                     history={this.props.history}

                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <ChatInputField photoURL={this.props.profilePictureURL}
                                        userID={this.props.userID}
                                        sendMessage={this.sendMessage}
                                        username={this.props.userInfo.username}

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
        usersInChat: state.chat.get('usersInChat').toJS(),
        profilePictureURL: state.chat.get('profilePictureURL'),
        showProfilePicture: state.chat.get('showProfilePicture'),
        userInfo: dataToJS(state.firebase, `users/${auth.uid}`)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetModal: () => dispatch(resetModal()),
        addMessage: (newMessage) => dispatch(addMessageToList(newMessage)),
        setAuthID: (authID) => dispatch(setUserAuthID(authID)),
        addMessageHistory: (messages, timestamp) => dispatch(addHistoryToList(messages, timestamp)),
        addUserToList: (authID) => dispatch(addUserToOnlineList(authID)),
        removeUserFromList: (authID) => dispatch(removeUserFromOnlineList(authID)),
        setProfilePictureURL: (profilePictureURL) => dispatch(setProfilePicture(profilePictureURL)),
        setProfilePictureInChat: (bool) => dispatch(showProfilePicture(bool)),
    };
}

const propsConnected = connect(mapStateToProps, mapDispatchToProps)(ChatComponent);

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}` : '/']))(propsConnected);

const authConnected = connect(
    ({ firebase }) => ({
        auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
    })
)(wrappedPlayerInfo);

export default authConnected