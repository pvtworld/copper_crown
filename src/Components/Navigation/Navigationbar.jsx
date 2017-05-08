import React from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../../Redux/Actions/loginAction'
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
                        <MenuItem onClick={() => props.dispatch(logoutAction)}>Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default connect()(Navigationbar);
