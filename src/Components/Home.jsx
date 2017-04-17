import React from 'react';
import {NavLink} from 'react-router-dom'

class Home extends React.Component{
    render() {
        return(
            <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/coppermap">CopperMap</NavLink>
                <h1>Home component!</h1>
            </div>
        )
    }
}

export default Home;