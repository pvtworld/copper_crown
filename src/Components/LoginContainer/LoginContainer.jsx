import React, { Component, PropTypes } from 'react'
import Login from '../Login/Login'
import './LoginContainer.css'
import Loadable from 'react-loading-overlay'
import { pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';


class LoginContainer extends Component {

    static propTypes = {
        auth: PropTypes.object,
    }

    componentWillReceiveProps({ auth }) {
        if (auth) {
            browserHistory.push('/') // redirect to /login if not authed
        }
    }

    render() {
        return (
            <Loadable active={false} spinner>
            <div className="fullscreen">
                    <div>
                        <div id="center_text">
                            <h2>COPPER</h2>
                            <h3>CROWN</h3>
                        </div>
                        <Login/>
                    </div>
            </div>
            </Loadable>

        );  
    }
};

const mapStateToProps = ({firebase}) => {
    return {
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth')
    }
}

export default (connect(mapStateToProps))(LoginContainer)



