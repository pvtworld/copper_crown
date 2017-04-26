import React,{Component} from 'react';
import LoginPage from './LoginPage';
import * as auth from '../Helpers/AuthHelpers';

export default class LoginContainer extends Component{
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
            <LoginPage onGithubLogin={this.handleGithubLogin} onFacebookLogin={this.handleFacebookLogin} onGoogleLogin={this.handleGoogleLogin}/>
        );
    }
}