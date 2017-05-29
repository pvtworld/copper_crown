import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import {Modal} from 'react-bootstrap';
import {addNewUser} from '../../Redux/Actions/userActions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { orange500 } from 'material-ui/styles/colors'

class UserNameChooser extends Component {

    constructor(){
        super();

        this.state = {
            value: ''
        };

        this.addUsername = this.addUsername.bind(this);
        this.handleNewUsername = this.handleNewUsername.bind(this);
    }

    addUsername(firebase, uid, userInfo, username) {
        const newUserInfo = {...userInfo};
        newUserInfo.username = username;
        firebase.set(`users/${uid}`, {...newUserInfo})
}

    handleNewUsername() {

        let username = this.state.value;
        if (username.length === 0) {
            return;
        } else if(username.length > 30){
            alert('Characters between 1 - 30');
            return;
        }
        this.addUsername(this.props.firebase, this.props.auth.uid, this.props.userInfo, username);
        this.props.dispatch(addNewUser());
    };


    onFormSubmit = (e) => {
        e.preventDefault();

        if(this.state.value.length === 0){
            alert('Enter a username');
            return;
        }

        this.handleNewUsername();

    }


    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    }

    onEnterPress = (event) => {
        if (event.charCode === 13) {
            event.preventDefault();
            this.onFormSubmit(event);
        }
    }

    render (){

        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Choose Username</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <p style={{color: '#6f6f6f', fontSize: '13px', marginTop: '5px', marginBottom: '10px'}}>Note that username <span style={{color: '#F44336', fontWeight: '500'}} > can't </span> be changed once chosen!</p>

                        <TextField
                            hintText="Choose your desired username..."
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyPress={this.onEnterPress}
                            fullWidth={true}
                            underlineFocusStyle={{borderColor: orange500}}
                        />
                        <p className='floating-right' style={{color: '#696969', marginRight: '5px'}}>{this.state.value.length}/30</p>


                    </Modal.Body>

                    <Modal.Footer>
                        <RaisedButton label="Ok"
                                      fullWidth={true}
                                      backgroundColor={'#FFF'}
                                      type="submit"
                                      primary={true}
                                      onTouchTap={this.onFormSubmit}
                        />
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined

})

const propsConnected = connect(mapStateToProps)(UserNameChooser);

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}` : '/']))(propsConnected);

const authConnected = connect(
    ({firebase}) => ({
        auth: pathToJS(firebase, 'auth')
    })
)(wrappedPlayerInfo)

export default authConnected;
