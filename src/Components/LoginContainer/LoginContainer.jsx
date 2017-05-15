import React from 'react'
import Login from '../Login/Login'
import './LoginContainer.css'
import Loadable from 'react-loading-overlay'
import { browserHistory } from 'react-router';
import { pathToJS } from 'react-redux-firebase'
import { connect } from 'react-redux'

class LoginContainer extends React.Component {

    render() {
        if(this.props.auth){
            browserHistory.push('/app')
        }

        return (
            <Loadable active={this.props.loadingUser} spinner>
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
}

const mapStateToProps = (state) => {
    return {
        auth: pathToJS(state.firebase, 'auth'),
        loadingUser: state.login.loadingUser,
    }
};

export default connect(mapStateToProps)(LoginContainer)


