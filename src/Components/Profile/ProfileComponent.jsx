import React from 'react';
import './ProfileComponent.css'
import {Button, Image} from 'react-bootstrap'
export default class ProfileComponent extends React.Component{
    render(){
        const back = <Button bsStyle="primary" onClick={this.props.leaveProfile}>Back</Button>;
        var {name, points, userID, roofsTaken, roofSizeTaken}=this.props;
        if(this.props.renderProfile){
            return(
                <div className="profile-box">
                    {back}
                    <div id ="center_text">
                    <h1>My account</h1>
                    <h4>Logged in as: {name} </h4>
                    <h5>User ID:  {userID}</h5>
                    <Image src="/anonympers.jpg" responsive />
                    <h5>Mail: </h5>
                    <h5>Points: {points}</h5>
                    <h5>Number of roofs: {roofsTaken}</h5>  
                    <h5>Area of roofs taken:  {roofSizeTaken}</h5>
                    </div>
                </div>
            )
        }
        return null;
    }
}