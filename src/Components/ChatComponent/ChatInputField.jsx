import React, {PropTypes} from 'react'

export default class ChatInputField extends React.Component {

    static propTypes = {
        userID: PropTypes.string,
        sendMessage: PropTypes.func,
    };

    componentDidMount() {
        this.refs.textMessage.focus();
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        try {
            let message = this.refs.textMessage.value;
            if (message.length === 0) {
                return;
            }

        const messageObj = {
            Who: this.props.userID,
            What: message,
            When: new Date().valueOf(),
        };

        this.props.sendMessage(messageObj);
        this.refs.textMessage.value = '';
        this.refs.textMessage.focus();

        }
        catch(err) {

        }

    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <input type="text" placeholder="Type message here" ref="textMessage" />
                <button type="submit">Send</button>
            </form>
        )
    }
}