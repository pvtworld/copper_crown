import React from 'react';
let {Link} = require('react-router');



class Login extends React.Component{
    render() {
        return (
            <div>
                <div>
                    <h2>Login Component</h2>
                </div>
                <div>
                 <button type="button" className="btn btn-default navbar-btn">Sign in</button>
                </div>
                <Link to="/pvt/coppermap">CopperMap</Link>
            </div>
        );
    }
}

export default Login;

