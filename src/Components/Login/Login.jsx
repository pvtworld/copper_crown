import React from 'react';
import {Button} from 'react-bootstrap';
import './Login.css'

export default class Login extends React.Component {
    render() {
        return (
            <div className="box">
                <div className="login">
                    <p>Sign in to play the Game</p>
                    <hr />

                    <Button bsStyle="primary" bsSize="large" block onClick={() => this.props.authenticate('facebook')} >Log In with Facebook</Button>
                    <Button bsStyle="default" bsSize="large" block onClick={() => this.props.authenticate('github')}>Log In with Github</Button>
                    <Button bsStyle="danger" bsSize="large" block onClick={() => this.props.authenticate('google')} >Log In with Google</Button>
                </div>
            </div>
        );
    }
};




