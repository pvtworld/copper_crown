import React from 'react';
import {Link} from 'react-router-dom';

export default class Welcome extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Welcome to CopperCrown!</h1>
                <div>
                    <Link to="/login">Register/Login</Link>
                </div>
            </div>
        );
    }
};