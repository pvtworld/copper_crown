import React from 'react';
import {Button} from 'react-bootstrap'

export default class ProfileComponent extends React.Component{
    render(){
        const back = <Button bsStyle="primary" onClick={this.props.leaveProfile}>Close</Button>;

        if(this.props.renderProfile){
            return(
                <div className="navpage-box">
                    <h1>Profile Component</h1>
                    {back}
                </div>
            )
        }
        return null;
    }
}