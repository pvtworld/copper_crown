import React from 'react';
import {Button, Panel, Col} from 'react-bootstrap';
import './Login.css'

const title = <h2>Sign in to play the game</h2>;

export default class Login extends React.Component {
    render() {
        return (
            <Col md={4} mdOffset={4}>
                <Panel className="login" header={title}>
                    <Button bsStyle="primary" bsSize="large" block onClick={() => this.props.authenticate('facebook')} >Log In with Facebook</Button>
                    <Button bsStyle="default" bsSize="large" block onClick={() => this.props.authenticate('github')}>Log In with Github</Button>
                    <Button bsStyle="danger" bsSize="large" block onClick={() => this.props.authenticate('google')} >Log In with Google</Button>
                </Panel>

            </Col>
        );
    }
};


