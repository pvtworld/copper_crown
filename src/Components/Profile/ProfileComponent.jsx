import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import './ProfileComponent.css'
import {Button, Image} from 'react-bootstrap'

class ProfileComponent extends React.Component{
    render(){
        //console.log(this.props.auth);
        //console.log(this.props.userInfo);
        const back = <Button bsStyle="primary" onClick={this.props.leaveProfile}>Close</Button>;
        if(this.props.renderProfile){
            return(
                <div className="navpage-box">
                    <h1>Profile Component</h1>
                    {back}
                    <div id="center_text">
                    <h1>My account</h1>
                    <h4>Logged in as: {this.props.auth.displayName} </h4>
                    <h5>User ID:  {this.props.auth.uid}</h5>
                    <Image id="picture" src={this.props.auth.photoURL} circle />
                    <h5>Mail: {this.props.auth.email}</h5>
                    <h5>Points: {this.props.userInfo.points}</h5>
                    <h5>Number of roofs taken: {'Not implemented'}</h5>  
                    <h5>Area of roofs taken:  {this.props.userInfo.areaOfCopper}</h5>
                    </div>
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined
})

const propsConnected = connect(mapStateToProps)(ProfileComponent)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}`: '/']))(propsConnected);

const authConnected = connect(
 ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth') // gets auth from redux and sets as prop
  })
)(wrappedPlayerInfo)

export default authConnected
