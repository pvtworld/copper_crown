import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

const Navigationbar = (props) => {
    var userName = props.auth.displayName;
    if (!userName) userName = "No Name";

    return(
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <a href="#" className="navbar-text visible-xs-inline-block">Example text</a>
                <Navbar.Brand>
                    <a>CopperCrown</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem onClick={props.renderPlayerInfo}>PlayerInfo</NavItem>
                    <NavItem onClick={props.renderLeader}>Leaderboards</NavItem>
                    <NavItem onClick={props.renderInfo}>About CopperCrown</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavDropdown title={`Signed in as: ${userName}`} id="basic-nav-dropdown">
                        <MenuItem onClick={props.renderProfile}>Profile</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={() => props.firebase.logout()}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};



const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
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
