import React from 'react';
import {Button} from 'react-bootstrap'

const Welcome = () => {
    return(
        <div style={{maxWidth: 400, margin: '40px auto 10px'}}>
            <h1>CopperCrown</h1>
            <Button bsStyle="primary" bsSize="large" block href="/login">Register/Login</Button>
        </div>
    );
};

export default Welcome;