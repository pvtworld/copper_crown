import React from 'react';
import { Button } from 'react-bootstrap';

class Login extends React.Component{
    render() {
        return (
            <div className="well" style={{maxWidth: 400, margin: '40px auto 10px'}}>
                <div>
                    <h2>Login with</h2>
                    <Button bsStyle="default" bsSize="large" block>Github</Button>
                    <Button bsStyle="primary" bsSize="large" block>Facebook</Button>
                    <Button bsStyle="danger" bsSize="large" block>Google</Button>
                </div>
            </div>
        );
    }
}

export default Login;