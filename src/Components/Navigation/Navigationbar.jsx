import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { showLeaderboard, showStolenRoofs, showStatistics, showProfile, resetModal, showChat, showHelp } from '../../Redux/Actions/navigationActions';
import './Nav.css'

const Navigationbar = (props) => {

    if(!props.userInfo){
        var userName = "";
    }
    else{
        userName = props.userInfo.username;
    }

    return(
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                {/*<a href="#" className="navbar-text visible-xs-inline-block">Example text</a>*/}
                <Navbar.Brand>
                    <a onClick={() => props.dispatch(resetModal())}>CopperCrown</a>
                    
                </Navbar.Brand>
                <Navbar.Toggle />
               
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem onClick={() => props.dispatch(showChat())}>Chat</NavItem>
                    <NavItem onClick={() => props.dispatch(showLeaderboard())}>Leaderboard</NavItem>
                    <NavItem onClick={()=> props.dispatch(showStatistics())}>Statistics</NavItem>
                    <NavItem onClick={() => props.dispatch(showProfile())}>Profile</NavItem>
                    <NavItem onClick={() => props.dispatch(showStolenRoofs())}>Stolen Roofs</NavItem>
                    <NavItem onClick={()=> props.dispatch(showHelp())}>Help</NavItem>
                </Nav>
                
                <Nav pullRight>
                {!props.loadingUser ? 
                    <NavDropdown title={`Signed in as: ${userName}`} id="basic-nav-dropdown">
                        <MenuItem onClick={() => props.firebase.logout()}>Logout</MenuItem>
                    </NavDropdown>
                :
                <CircularProgress color={'#ffeb3b'}/>
                }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};



const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined,
    loadingUser: auth ? pathToJS(firebase, `requesting/users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(Navigationbar)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected;
