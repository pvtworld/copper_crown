import React from 'react';
import * as auth from '../Helpers/AuthHelpers';
import {Link} from 'react-router-dom';
import firebase from './../Firebase/index'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            name: 'default name'
        }
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        var storeTempDisplayName = '';
        if (user != null) {
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: "+profile.providerId);
                console.log("  Provider-specific UID: "+profile.uid);
                console.log("  Name: "+profile.displayName);
                console.log("  Email: "+profile.email);
                console.log("  Photo URL: "+profile.photoURL);
                storeTempDisplayName = profile.displayName;
            });
        }
        this.setState({
            name: storeTempDisplayName
        })

    }

    logoutUser(event){
        event.preventDefault();
        auth.userLogout();
    }

    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Copper Crown</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <Navbar.Text pullLeft>
                                Signed in as: {this.state.name}
                            </Navbar.Text>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} onClick={this.logoutUser} href="/login">Logout</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <h1>Dashboard Component!</h1>
                <h2>Welcome, {this.state.name}!</h2>
                <div>
                </div>
                <div>
                    <Link to="/coppermap">CopperMap</Link>
                </div>

            </div>
        )
    };
}

export default Dashboard;