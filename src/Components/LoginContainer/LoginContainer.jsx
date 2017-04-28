import React from 'react';
import Login from '../Login/Login'
import './LoginContainer.css'

export default class LoginContainer extends React.Component {
    render() {
        return (
            <div>
                <Login authenticate={this.props.authenticate}/>
            </div>
        );
    }
};




