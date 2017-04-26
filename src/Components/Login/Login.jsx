import React from 'react';
import { Button } from 'react-bootstrap';
import * as auth from '../../Helpers/AuthHelpers';

class Login extends React.Component{
    handleGithubLogin() {
        auth.githubLogin();
    }
    handleFacebookLogin() {
        auth.facebookLogin();
    }
    handleGoogleLogin() {
        auth.googleLogin();
    }
    render() {
        return (
            <div className="custom" style={{maxWidth: 400, margin: '40px auto 10px'}}>
                    <h4>Login with</h4>
                    <Button bsStyle="primary" bsSize="large" block onClick={this.handleFacebookLogin}>Facebook</Button>
                    <Button bsStyle="default" bsSize="large" block onClick={this.handleGithubLogin}>Github</Button>
                    <Button bsStyle="danger" bsSize="large" block onClick={this.handleGoogleLogin}>Google</Button>
            </div>
        );
    }
}

export default Login;