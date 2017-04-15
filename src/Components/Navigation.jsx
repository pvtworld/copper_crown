import React from 'react';
let {Link, IndexLink} = require('react-router');

class Navigation extends React.Component{
    render() {
        return(
            <div>
                <h2>Navigation Component</h2>
                <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Login</IndexLink>
                <Link to="/coppermap" activeClassName="active"  activeStyle={{fontWeight: 'bold'}}>CopperMap</Link>
            </div>
        );
    }
}

export default Navigation;
