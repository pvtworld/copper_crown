import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class Navigation extends React.Component{

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a onClick={this.props.userLogout} href="/login">CopperCrown</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Navbar.Text>
                            Signed in as: {this.props.userName}
                        </Navbar.Text>
                        <Nav>
                            <NavItem eventKey={1} href="#">Leaderboard</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={2} onClick={this.props.userLogout} href="/login">Logout</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;