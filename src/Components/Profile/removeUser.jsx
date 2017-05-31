import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';

class RemoveUser extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

createRoofs = (roofs) => {
    const objectKeys = Object.keys(roofs);
    const array = Object.values(roofs);
    for (let i = 0; i < array.length; i++) { 
        (array[i]).firebaseId = objectKeys[i];
    }

    console.log(array)
    return array;
    }

removeUser = () => {
    
    this.props.dispatch({type: 'UPDATING_STOLEN_ROOFS'})
        if(this.props.stolenRoofs){
            let roofs = this.createRoofs(this.props.stolenRoofs)
            roofs.forEach(function(roof) {
                this.props.firebase.remove(`stolenRoofs/${roof.firebaseId}`)
            }, this);
        }


        return Promise.resolve()
    
    //
    .then( () => {
        this.props.dispatch({type: 'STOLEN_ROOFS_UPDATED'})
        return Promise.resolve();
    })
    .then( () => {
        this.props.dispatch({type: 'REMOVING_USER'})
        this.props.firebase.remove(`users/${this.props.auth.uid}`)
        this.props.firebase.logout();
    })
    .then( () => {
        this.props.dispatch({type: 'USER_REMOVED'})
        this.handleClose();
        window.location.reload()
    })    
}   

  render() {
    const actions = [
      <FlatButton
        label="cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        disabled={this.props.requestingStoolenRoofs}
        label="Delete my account"
        secondary={true}
        onTouchTap={this.removeUser}
      />,
    ];

    return (
      <div>
        <RaisedButton label="delete account" onTouchTap={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          This will remove all your stolen roofs and all account information, continue?
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, {auth}) => {
    return{
        userInfo: dataToJS(state.firebase, `users/${auth.uid}`),
        stolenRoofs: dataToJS(state.firebase, `stolenRoofs`),
        requestingStoolenRoofs: pathToJS(state.firebase, 'requesting/stolenRoofs')
    }
}

const propsConnected = connect(mapStateToProps)(RemoveUser)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `stolenRoofs#orderByChild=userId&equalTo=${auth.uid}`: '/', auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected