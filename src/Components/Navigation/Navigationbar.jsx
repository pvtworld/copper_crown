import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

const Navigationbar = (props) => {
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
                    <NavDropdown title="Signed in as: No Name" id="basic-nav-dropdown">
                        <MenuItem onClick={props.renderProfile}>Profile</MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={() => props.firebase.logout()}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default firebaseConnect()(Navigationbar);
