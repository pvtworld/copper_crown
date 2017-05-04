import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Navigationbar extends React.Component{
    render(){
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a>CopperCrown</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                        {/*Get the displayName from provider via firebase*/}
                        Signed in as: Default Name
                    </Navbar.Text>
                    <Nav>
                        <NavItem eventKey={1} onClick={this.props.renderProfile}>Profile</NavItem>
                        <NavItem eventKey={2} onClick={this.props.renderLeader}>Leaderboards</NavItem>
                        <NavItem eventKey={3} onClick={this.props.renderInfo}>Info</NavItem>
                        <NavItem eventKey={4} onClick={this.props.renderPlayerInfo}>PlayerInfo</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem onClick={this.props.logout}>Logout</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

