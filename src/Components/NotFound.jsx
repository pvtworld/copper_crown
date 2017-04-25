import React from 'react';
import {Link} from 'react-router-dom';

const link = (
    <Link to='/'>home</Link>
);

 const NotFound = () => {
    return(
        <div>
            <h2>404 the page you are looking for cannot be found. </h2>
            <h3>Head to {link} to continue your search.</h3>
        </div>
    );
};

export default NotFound;