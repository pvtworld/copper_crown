import React from 'react';
let {Link} = require('react-router');



class Login extends React.Component{
    render() {
        return (
            <div>
                <h2>Login Component</h2>
                <div>
                    <Link to="/coppermap" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>CopperMap</Link>
                </div>
                <div>
                    <button type="button" className="btn btn-default navbar-btn">Sign in with Github</button>
                </div>
            </div>
        );
    }
}

export default Login;


