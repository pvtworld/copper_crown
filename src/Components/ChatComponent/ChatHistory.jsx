import React, {PropTypes} from 'react';
export default class ChatHistory extends React.Component {

    static propTypes = {
        history: PropTypes.array
    };

    render() {
        console.log('history: ', this.props.history)
        return (
            <ul>
                { this.props.history.map((messageObject) => {
                    const messageDate = new Date(messageObject.When);
                    const messageDateTime = messageDate.toLocaleDateString() +
                        ' at ' + messageDate.toLocaleTimeString();
                    return (
                        <li key={messageObject.When } >
                            <span>USERID: #{messageObject.Who}</span>
                            <div><span>{messageObject.What}</span></div>
                            <div><span>{messageDateTime}</span></div>
                        </li>
                    );})
                }
            </ul>
        );
    }
}