import React from 'react'
import Login from '../Login/Login'
import './LoginContainer.css'
import Loadable from 'react-loading-overlay'
import { connect } from 'react-redux'
//import { browserHistory } from 'react-router'

class LoginContainer extends React.Component {

/*    componentWillMount({ auth }){
        if(auth){
            console.log('User auth, redirecting to /app')
            browserHistory.push('/app')
        }
    }*/

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

const mapStateToProps = (state /*{firebase}*/) => {
    return{
        loadingUser: state.login.loadingUser,
        /*auth: firebase.auth*/
    }
}
export default connect(mapStateToProps)(LoginContainer)


