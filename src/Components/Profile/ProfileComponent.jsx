import React from 'react';
import './ProfileComponent.css'
import {Button} from 'react-bootstrap'
export default class ProfileComponent extends React.Component{
    render(){
        const back = <Button bsStyle="primary" onClick={this.props.leaveProfile}>Back</Button>;
        var {name, points, userID, roofsTaken, roofSizeTaken}=this.props;
        if(this.props.renderProfile){
            return(
                <div className="profile-box">
                    {back}
                    <div id ="center_text">
                    <h1>Mitt konto</h1>
                    <h2>Logged in as: {name} </h2>
                    <h3>Användar ID:  {userID}</h3>
                    <h4>Mejladress: </h4>
                    <h5>Poäng: {points}</h5>
                    <h6>Antal tagna tak: {roofsTaken}  Total storlek:  {roofSizeTaken}</h6>
                    </div>
                </div>
            )
        }
        return null;
    }
}