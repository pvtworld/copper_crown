import React, {PropTypes} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import './ChatInput.css'
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'
import Chip from 'material-ui/Chip';

class ChatInputField extends React.Component {

    constructor(){
        super();
        this.state = ({
            value: ''
        })
    }

    static propTypes = {
        userID: PropTypes.string,
        sendMessage: PropTypes.func,
    };

    onFormSubmit = (e) => {
        e.preventDefault();

        try {
            let message = this.state.value;
            if (message.length === 0) {
                return;
            }

        const messageObj = {
            Who: this.props.userID,
            What: message,
            When: new Date().valueOf(),
        };

        this.props.sendMessage(messageObj);
        this.setState({
            value: ''
        })

        }
        catch(err) {

        }

    }

    onEnterPress = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            this.onFormSubmit(e);
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        console.log('Value state: ', this.state.value)
        return (
            <div className="footer-bar">
                    <TextField
                        hintText="Type message here"
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyPress={this.onEnterPress}
                    />
                    <FloatingActionButton   backgroundColor={'#222222'}
                                            type="submit"
                                            onTouchTap={this.onFormSubmit}
                    >

                        <ContentSend />
                    </FloatingActionButton>


                <Chip style={{margin: 4}}>
                    <Avatar src={this.props.auth.photoURL} />
                    {this.props.auth.uid}
                </Chip>

            </div>
        )
    }
}

const mapStateToProps = (state, {auth}) => {
    return {
        auth: pathToJS(state.firebase, 'auth')
    }
}

export default connect(mapStateToProps)(ChatInputField)