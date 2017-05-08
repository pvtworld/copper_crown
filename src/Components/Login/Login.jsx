import React from 'react';
import { connect } from 'react-redux';
import './Login.css'
import {Button, Panel, Col} from 'react-bootstrap';
import { loginAction } from '../../Redux/Actions/loginAction'
import ToolTip from '../ToolTip/ToolTip'

const title = <h2>Sign in to play the game</h2>;
class Login extends React.Component {
    render() {
        return (
            <Col md={4} mdOffset={4}>
                <Panel className="login" header={title}>
                    <Button bsStyle="primary" bsSize="large" block onClick={() => this.props.dispatch(loginAction)} >Log In with Facebook</Button>
                    <Button bsStyle="default" bsSize="large" block onClick={() => this.props.authenticate('github')}>Log In with Github</Button>
                    <Button bsStyle="danger" bsSize="large" block onClick={() => this.props.authenticate('google')} >Log In with Google</Button>
                    <Col className="text-right">
                        <ToolTip delayShow={200} id="tooltip-bottom" placement="bottom" tooltip="Help text. Help text. Help text. Help text. Help text. Help text." >Help</ToolTip>
                    </Col>
                </Panel>
            </Col>
        );
    }
};

export default connect()(Login)


