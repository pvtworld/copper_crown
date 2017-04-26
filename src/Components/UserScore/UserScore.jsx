import React from 'react';

export default class UserScore extends React.Component {
    render(){
        return(
            <div>
                <h1>User Score is: {this.props.state.userInfo.points}</h1>
            </div>
        );
    }
};