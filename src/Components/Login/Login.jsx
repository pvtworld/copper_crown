import React from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase'
import './Login.css'
import {Button, Panel, Col} from 'react-bootstrap';
import ToolTip from '../ToolTip/ToolTip'
import { loadingUser, finishedLoadingUser, loadingError } from '../../Redux/Actions/copperMapActions'
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { blue700 } from 'material-ui/styles/colors'
import FontIcon from 'material-ui/FontIcon';

const title = <h4>Sign in to play the game</h4>;

const loginUser = (firebase, provider, dispatch) => {
    dispatch(loadingUser());
    firebase.login({provider: provider, type: 'popup'}).then(() => {
        dispatch(finishedLoadingUser());
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

                    <RaisedButton
                        onTouchTap={() => loginUser(props.firebase, 'facebook', props.dispatch)}
                        label="Facebook Login"
                        buttonStyle={{backgroundColor: '#1565C0'}}
                        secondary={true}
                        fullWidth={true}
                        style={{marginBottom: '10px'}}

                    />


                    <RaisedButton
                        onTouchTap={() => loginUser(props.firebase, 'github', props.dispatch)}
                        label="Github Login"
                        buttonStyle={{backgroundColor: '#757575'}}
                        secondary={true}
                        fullWidth={true}
                        style={{marginBottom: '10px'}}

                    />

                    <RaisedButton
                        onTouchTap={() => loginUser(props.firebase, 'google', props.dispatch)}
                        label="Google Login"
                        buttonStyle={{backgroundColor: '#F44336'}}
                        secondary={true}
                        fullWidth={true}
                        style={{marginBottom: '10px'}}

                    />



        {/*            <Button bsStyle="primary" bsSize="large" block onClick={() => loginUser(props.firebase, 'facebook', props.dispatch)} >Log In with Facebook</Button>
                    <Button bsStyle="default" bsSize="large" block onClick={() => loginUser(props.firebase, 'github', props.dispatch)}>Log In with Github</Button>
                    <Button bsStyle="danger" bsSize="large" block onClick={() => loginUser(props.firebase, 'google', props.dispatch)} >Log In with Google</Button>*/}

                    <Col className="text-right">
                        <ToolTip delayShow={200} id="tooltip-bottom" placement="bottom" tooltip="Help text. Help text. Help text. Help text. Help text. Help text." >Help</ToolTip>
                    </Col>
                </Panel>
            </Col>
        );
    };

export default compose(firebaseConnect(), connect())(Login)


