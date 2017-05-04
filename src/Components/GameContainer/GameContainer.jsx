import React from 'react';
import CopperMap from '../CopperMap/CopperMap';
import InfoComponent from '../Info/InfoComponent';
import ProfileComponent from '../Profile/ProfileComponent.jsx'
import LeaderboardComponent from '../Leaderboard/LeaderComponent.jsx';

export default class GameContainer extends React.Component{
    state = {
        renderInfo: false,
        renderProfile: false,
        renderLeader: false
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

    renderLeader = () => {
        this.setState({
            renderLeader: true
        })
    };

    leaveLeader = () => {
        this.setState({
            renderLeader: false
        })
    };

    render() {
        const logout = <button onClick={this.props.logout}>Log Out!</button>;
        const leaderboard = <button onClick={this.renderLeader}>Leaderboard</button>;
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
                <LeaderboardComponent renderLeader={this.state.renderLeader} leaveLeader={this.leaveLeader} getLeaderboard={this.props.getLeaderboard}/>
            </div>
        )
    }
}