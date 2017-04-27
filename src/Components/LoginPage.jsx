import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

    export default class LoginPage extends Component{

    render() {
                return (
                    <div className="custom" style={{maxWidth: 400, margin: '40px auto 10px'}}>
                                <h4>Login with</h4>
                                <Button bsStyle="primary" bsSize="large" block onClick={this.props.onFacebookLogin}>Facebook</Button>
                                <Button bsStyle="default" bsSize="large" block onClick={this.props.onGithubLogin}>Github</Button>
                                <Button bsStyle="danger" bsSize="large" block onClick={this.props.onGoogleLogin}>Google</Button>
                        </div>
                );
            }
}