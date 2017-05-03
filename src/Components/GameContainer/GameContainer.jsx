import React from 'react';
import CopperMap from '../CopperMap/CopperMap';
import InfoComponent from '../Info/InfoComponent';
import ProfileComponent from '../Profile/ProfileComponent.jsx'

export default class GameContainer extends React.Component{
    state = {
        renderInfo: false,
        renderLeaderboard: false,
        renderProfile: false
    };

    renderInfo = () => {
        this.setState({
            renderInfo: true
        })
    };

    leaveInfo = () => {
        this.setState({
            renderInfo: false
        })
    };

    renderProfile = () => {
        this.setState({
            renderProfile: true
        })
    };

    leaveProfile = () => {
        this.setState({
            renderProfile: false
        })
    };

    render() {
        const logout = <button onClick={this.props.logout}>Log Out!</button>;
        const leaderboard = <button onClick={this.props.getLeader}>Print Leaderboard in console</button>;
        const info = <button onClick={this.renderInfo}>Info</button>;
        const profile = <button onClick={this.renderProfile}>Profile</button>;

        return (
            <div>
                <CopperMap state={this.props.state}
                           addRoof={this.props.addRoof}
                           roofAlreadyStolen={this.props.roofAlreadyStolen}
                />
                {logout}{leaderboard}{info}{profile}
                <InfoComponent renderInfo={this.state.renderInfo} leaveInfo={this.leaveInfo}/>
                <ProfileComponent renderProfile={this.state.renderProfile} leaveProfile={this.leaveProfile}/>

            </div>
        )
    }
}