import React from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'
import './Login.css'
import {Button, Panel, Col} from 'react-bootstrap';
import ToolTip from '../ToolTip/ToolTip'
import { loadingUser, finishedLoadingUser, loadingError } from '../../Redux/Actions/copperMapActions'
import { showUsernameModal } from '../../Redux/Actions/userActions';
import { browserHistory } from 'react-router';

const title = <h2>Sign in to play the game</h2>;

const registeredUser = () => {
    console.log('check if in fiiiiireeeeeeeeeeebase');
    return true;
};

const loginUser = (firebase, provider, dispatch) => {
    dispatch(loadingUser());
    firebase.login({provider: provider, type: 'popup'}).then(() => {
        dispatch(finishedLoadingUser());
        if (registeredUser()){
            dispatch(showUsernameModal());
        }
        console.log('Login successful, redirecting to /app');
        browserHistory.push('/app')
    }, (error) => {
        //handle login error
        dispatch(loadingError());
        alert('Unable to authenticate!\n' + error);
    })
};

const Login = (props) => {
        return (
            <Col md={4} mdOffset={4}>
                <Panel className="login" header={title}>
                    <Button bsStyle="primary" bsSize="large" block onClick={() => loginUser(props.firebase, 'facebook', props.dispatch)} >Log In with Facebook</Button>
                    <Button bsStyle="default" bsSize="large" block onClick={() => loginUser(props.firebase, 'github', props.dispatch)}>Log In with Github</Button>
                    <Button bsStyle="danger" bsSize="large" block onClick={() => loginUser(props.firebase, 'google', props.dispatch)} >Log In with Google</Button>
                    <Col className="text-right">
                        <ToolTip delayShow={200} id="tooltip-bottom" placement="bottom" tooltip="Help text. Help text. Help text. Help text. Help text. Help text." >Help</ToolTip>
                    </Col>
                </Panel>
            </Col>
        );
    };

export default compose(firebaseConnect(), connect())(Login)


