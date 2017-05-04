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
                    <h4>Logged in as: {name} </h4>
                    <h5>Användar ID:  {userID}</h5>
                    <img src="anonympers.jpg" className="image-responsive" alt="Your picture"/>
                    <h5>Mejladress: </h5>
                    <h5>Poäng: {points}</h5>
                    <h5>Antal tagna tak: {roofsTaken}</h5>  
                    <h5>Total storlek:  {roofSizeTaken}</h5>
                    </div>
                </div>
            )
        }
        return null;
    }
}