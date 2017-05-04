import React from 'react';
import {Button} from 'react-bootstrap'

export default class ProfileComponent extends React.Component{
    render(){
        const back = <Button bsStyle="primary" onClick={this.props.leaveProfile}>Close</Button>;

        if(this.props.renderProfile){
            return(
                <div className="navpage-box">
                    {back}
                    <div>
                        <h3>Profile</h3>
                    </div>
                </div>
            )
        }
        return null;
    }
}