import React, {PropTypes} from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'
import ReactDOM from 'react-dom'


class ChatHistory extends React.Component {

    static propTypes = {
        history: PropTypes.array
    };

    componentWillReceiveProps(){
        const elem = ReactDOM.findDOMNode(this.refs.test);

        if (elem) {
            elem.scrollIntoView(true);
        }
    }

    render() {
        return (
            <List>
                { this.props.history.map((messageObject) => {
                    const messageDate = new Date(messageObject.When);
                    const messageDateTime = messageDate.toLocaleTimeString();
                    return (
                                <ListItem leftAvatar={<Avatar src={messageObject.PhotoURL} />}
                                          disabled={true}
                                          primaryText={<p style={{color: '#727272', fontSize: '15px'}}>{messageObject.Who} </p>}
                                          secondaryText={<p style={{color: '#222222', fontSize: '16px'}}>{messageObject.What} <span style={{color: '#727272', fontSize: '13px'}}>at {messageDateTime}</span></p>}
                                          secondaryTextLines={2}
                                          key={messageObject.When}
                                          ref="test"
                                />
                        );})
                }
            </List>
        );
    }
}

const mapStateToProps = (state, {auth}) => {
    return {
        auth: pathToJS(state.firebase, 'auth')
    }
}

export default connect(mapStateToProps)(ChatHistory)
