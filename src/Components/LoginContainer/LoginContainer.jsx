import React from 'react';
import Login from '../Login/Login'
import './LoginContainer.css'

export default class LoginContainer extends React.Component {
    render() {
        return (
            <div>
                <div id="center_text">
                    <h2>COPPER</h2>
                    <h3>CROWN</h3>
                </div>
                <Login authenticate={this.props.authenticate}/>
            </div>
        );
    }
};




