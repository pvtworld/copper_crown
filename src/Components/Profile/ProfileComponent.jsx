import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import './ProfileComponent.css';
import { Avatar, IconButton, List, ListItem } from 'material-ui';
import { Modal } from 'react-bootstrap';
import {red500, red900} from 'material-ui/styles/colors';
import Close from 'material-ui/svg-icons/navigation/close';
import Email from 'material-ui/svg-icons/communication/email';
import Money from 'material-ui/svg-icons/editor/attach-money';
import Home from 'material-ui/svg-icons/action/home';
import Layers from 'material-ui/svg-icons/maps/layers';
import { resetModal } from '../../Redux/Actions/navigationActions';

const ProfileComponent = (props) => {

    return (
        <div className="static-modal">
            <Modal.Dialog style={{overflow: 'auto'}}>
                <Modal.Header>
                    <div className="floating-right">
                        <IconButton onClick={() => props.dispatch(resetModal())}>
                            <Close color={red500}
                                   hoverColor={red900}/>
                        </IconButton>
                        </div>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <List>
                        <ListItem 
                            leftAvatar={<Avatar src={props.auth.photoURL}/>}
                            primaryText={'Username: '}
                            secondaryText={props.userInfo.username}
                        />
                        <ListItem 
                            leftAvatar={<Email/>}
                            primaryText={'Email: '} 
                            secondaryText={props.auth.email}/>
                        <ListItem 
                            leftAvatar={<Money/>}
                            primaryText={'Points: '} 
                            secondaryText={props.userInfo.points ? props.userInfo.points : '0'}/>
                        <ListItem 
                            leftAvatar={<Home/>}
                            primaryText={'Number of roofs taken:'} 
                            secondaryText={props.userInfo.roofsStolen ? props.userInfo.roofsStolen : '0'}/>
                        <ListItem 
                            leftAvatar={<Layers/>}
                            primaryText={'Area of roofs taken:'} 
                            secondaryText={props.userInfo.areaOfCopper ? props.userInfo.areaOfCopper : '0'}/>

                    </List>
                    

                </Modal.Body>

            </Modal.Dialog>
        </div>
    )
}

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(ProfileComponent)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? (`users/${auth.uid}`): ('/')]))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
     auth: pathToJS(firebase, 'auth')
  })
)(wrappedPlayerInfo)

export default authConnected
