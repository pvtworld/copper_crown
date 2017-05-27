import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'
import ReactDOM from 'react-dom'
import './ChatInput.css'


class ChatHistory extends React.Component {

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
                        const messageDate = new Date(messageObject.When);
                        const messageDateTime = messageDate.toLocaleTimeString();
                        return (
                            <ListItem leftAvatar={<Avatar src={messageObject.PhotoURL} style={{display: 'block'}}/>}
                                      disabled={true}
                                      primaryText={<p style={{color: '#727272', fontSize: '13px'}}>{messageObject.Who} </p>}
                                      secondaryText={<p style={{color: '#222222', fontSize: '14px'}}>{messageObject.What} <span style={{color: '#727272', fontSize: '13px'}}>at {messageDateTime}</span></p>}
                                      secondaryTextLines={2}
                                      key={messageObject.When}
                            />
                        );})
                    }
                </List>
            </ul>
        );
    }
}

const mapStateToProps = (state, {auth}) => {
    return {
        auth: pathToJS(state.firebase, 'auth')
    }
}

export default connect(mapStateToProps)(ChatHistory)
