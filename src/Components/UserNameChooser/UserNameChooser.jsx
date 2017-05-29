import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import {Modal, Button} from 'react-bootstrap';
import {addNewUser} from '../../Redux/Actions/userActions';

class UserNameChooser extends Component {

    constructor(){
        super();
        this.addUsername = this.addUsername.bind(this);
        this.handleNewUsername = this.handleNewUsername.bind(this);
    }

    addUsername(firebase, uid, userInfo, username) {
    const newUserInfo = {...userInfo};
    newUserInfo.username = username;
    firebase.set(`users/${uid}`, {...newUserInfo})
}

    handleNewUsername() {
        console.log('ny ver')
        var username = this.refs.newUserName.value;
        this.addUsername(this.props.firebase, this.props.auth.uid, this.props.userInfo, username);
        this.props.dispatch(addNewUser());
    };

    render (){
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Choose Username</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Enter a username: </p>
                        <input type="text" ref="newUserName" />
                    </Modal.Body>

                    <Modal.Footer>
                            <Button bsStyle="success" bsSize="large" block onClick={this.handleNewUsername} >Ok</Button>
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
