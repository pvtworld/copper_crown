import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { pathToJS } from 'react-redux-firebase'
import ReactDOM from 'react-dom'
import './ChatInput.css'
import Divider from 'material-ui/Divider';


export default class ChatHistory extends React.Component {

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onScroll = () => {
        const scrollTop = this.refs.messageList.scrollTop;
        if (scrollTop === 0) {
            this.props.fetchHistory()
        }
    }

    scrollToBottom = () => {
        const scrollHeight = this.refs.messageList.scrollHeight;
        const height = this.refs.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(this.refs.messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    render() {
        return (
            <ul className="collection" ref="messageList" onScroll={this.onScroll}>
                <List>
                    { this.props.history.map((messageObject) => {
                        const messageDate = new Date(messageObject.messageTimestamp);
                        const messageDateTime = messageDate.toLocaleTimeString();
                        return (
                            <div>
                            <ListItem leftAvatar={<Avatar src={messageObject.PhotoURL} style={{display: 'block'}}/>}
                                      disabled={true}
                                      primaryText={<p style={{color: '#727272', fontSize: '13px'}}>{messageObject.authID} </p>}
                                      secondaryText={<p style={{color: '#222222', fontSize: '14px'}}>{messageObject.newMessage} <span style={{color: '#727272', fontSize: '13px'}}>at {messageDateTime}</span></p>}
                                      secondaryTextLines={2}
                                      key={messageObject.When}
                            />
                             <Divider/>
                            </div>
                        );})
                    }
                </List>
            </ul>
        );
    }
}
