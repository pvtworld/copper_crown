import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class Navigationbar extends React.Component{
    render(){
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <a href ="#" className="navbar-text visible-xs-inline-block">Example text</a>
                    <Navbar.Brand>
                        <a>CopperCrown</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} onClick={this.props.renderProfile}>Profile</NavItem>
                        <NavItem eventKey={4} onClick={this.props.renderPlayerInfo}>PlayerInfo</NavItem>
                        <NavItem eventKey={2} onClick={this.props.renderLeader}>Leaderboards</NavItem>
                        <NavItem eventKey={3} onClick={this.props.renderInfo}>About</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="Signed in as: " id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.4}>Separated link</MenuItem>
                        </NavDropdown>
                        <NavItem onClick={this.props.logout}>Logout</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

