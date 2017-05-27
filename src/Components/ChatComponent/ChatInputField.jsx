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
            typingDisabled: false
        })
    }

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
            PhotoURL: this.props.photoURL
        };

        if(this.state.value.length > 30){
            alert('Maximum 30 characters')
        }else{
            this.props.sendMessage(messageObj);
            this.setState({
                value: ''
            })
        }

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
        console.log(this.state.value)
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
                    />

                <p className='floating-right' style={{color: '#696969'}}>{this.state.value.length}/30</p>

                <Chip style={{marginTop: 10, marginBottom: 10}}
                      backgroundColor={orange200}>
                    <Avatar src={this.props.photoURL} />
                        {this.props.auth.uid}
                </Chip>

                <div style={{clear: 'both'}}>
                <RaisedButton label="Send" fullWidth={true} backgroundColor={'#FFF'}
                              type="submit"
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