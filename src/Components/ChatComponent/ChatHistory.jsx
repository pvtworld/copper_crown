import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
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
                                          key={messageObject.When}
                                >
                                    <p style={{color: '#6f6f6f', fontSize: '13px'}}>{messageObject.authID}</p>
                                    <p style={{color: '#3d3d3d', fontSize: '14px'}}>{messageObject.newMessage} <span
                                        style={{color: '#6f6f6f', fontSize: '12px'}}>at {messageDateTime}</span></p>
                                </ListItem>
                                <Divider/>
                            </div>
                        );
                    })
                    }
                </List>
            </ul>
        );

    }
}
