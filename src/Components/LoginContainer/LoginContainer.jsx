import React from 'react';
import Login from '../Login/Login'
import './LoginContainer.css'
import Loadable from 'react-loading-overlay'

export default class LoginContainer extends React.Component {
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




