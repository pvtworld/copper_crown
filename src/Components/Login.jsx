import React from 'react';
let {Link, IndexLink} = require('react-router');

class Login extends React.Component{
    render() {
        return (
            <div>
                <h2>Login Component</h2>
                <button type="button" className="btn btn-default navbar-btn">Sign in</button>
                <Link to="/coppermap" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>CopperMap</Link>
            </div>
        );
    }
}

export default Login;