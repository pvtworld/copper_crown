import React from 'react';
import {Link} from 'react-router-dom';

const Welcome = () => {
    return(
        <div>
            <h1>Welcome to CopperCrown!</h1>
            <div>
                <Link to="/login">Register/Login</Link>
            </div>
        </div>
    );
};

export default Welcome;