import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux'
import { pathToJS } from 'react-redux-firebase'
import Chip from 'material-ui/Chip';
import './ChatInput.css'
import RaisedButton from 'material-ui/RaisedButton';
import { orange200, orange500 } from 'material-ui/styles/colors'

class ChatInputField extends React.Component {

    constructor(){
        super();
        this.state = ({
            value: '',
            disabledButton: false,
        })
    }


    onFormSubmit = (e) => {
        e.preventDefault();

        try {
            let message = this.state.value;
            if (message.length === 0) {
                return;
            } else if(message.length > 100){
                alert('Maximum characters (100) exceeded')
                return;
            }

        const messageObj = {
            authID: this.props.userID,
            newMessage: message + '',
            messageTimestamp: new Date().valueOf(),
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

/*        if(this.state.value.length < 101){
            this.setState({
                disabledButton: false
            })
        }

        if(this.state.value.length > 98){
            this.setState({
                disabledButton: true
            })
        }*/
    };

    render() {
        return (
            <div>
                    <TextField
                        hintText="Type message here..."
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyPress={this.onEnterPress}
                        fullWidth={true}
                        underlineFocusStyle={{borderColor: orange500}}
                        multiLine={true}
                        rows={2}
                        rowsMax={2}
                    />

                <p className='floating-right' style={{color: '#696969'}}>{this.state.value.length}/100</p>

                <Chip style={{marginTop: 10, marginBottom: 15}}
                      backgroundColor={orange200}>
                    <Avatar src={this.props.photoURL} />
                        {this.props.auth.uid}
                </Chip>

                <div style={{clear: 'both'}}>
                <RaisedButton label="Send"
                              fullWidth={true}
                              backgroundColor={'#FFF'}
                              type="submit"
                              primary={true}
                              disabled={this.state.disabledButton}
                              onTouchTap={this.onFormSubmit}
                />
                </div>



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