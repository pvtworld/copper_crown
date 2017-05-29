import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ReactDOM from 'react-dom'
import './ChatInput.css'


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
                                    <p style={{fontSize: '13px'}}>
                                        <span style={{color: '#6f6f6f', fontWeight: '450'}}>{messageObject.authID}</span>
                                        <span style={{color: '#222222', fontWeight: '350'}}>&nbsp; &nbsp;{messageObject.newMessage}</span>
                                        <span style={{color: '#6f6f6f', fontWeight: '250', display: 'block', fontSize: '11px', opacity: '0.6'}}>{messageDateTime}</span>

                                    </p>
                                </ListItem>
                            </div>
                        );
                    })
                    }
                </List>
            </ul>
        );

    }
}
