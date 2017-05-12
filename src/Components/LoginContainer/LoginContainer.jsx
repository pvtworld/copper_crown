import React, { Component, PropTypes } from 'react'
import Login from '../Login/Login'
import './LoginContainer.css'
import Loadable from 'react-loading-overlay'
import { pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux'

class LoginContainer extends React.Component {
    render() {
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
};

const mapStateToProps = (state) => {
    return{
        loadingUser: state.login.loadingUser
    }
}
export default connect(mapStateToProps)(LoginContainer)



