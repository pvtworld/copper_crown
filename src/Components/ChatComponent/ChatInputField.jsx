import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'
import Chip from 'material-ui/Chip';
import './ChatInput.css'
import RaisedButton from 'material-ui/RaisedButton';
import { orange200 } from 'material-ui/styles/colors'

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

            console.log('PHOTOURL: ', this.props.photoURL);

        const messageObj = {
            Who: this.props.userID,
            What: message,
            When: new Date().valueOf(),
            PhotoURL: this.props.photoURL
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
            <div>
                    <TextField
                        hintText="Type message here..."
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyPress={this.onEnterPress}
                        fullWidth={true}
                    />

                <RaisedButton label="Send" fullWidth={true} backgroundColor={'#FFF'}
                              type="submit"
                              onTouchTap={this.onFormSubmit}/>

                <Chip style={{margin: 4}}
                      backgroundColor={orange200}>
                    <Avatar src={this.props.photoURL} />
                    You: {this.props.auth.uid}
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