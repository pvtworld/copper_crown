import React from 'react';

import CopperMap from '../CopperMap/CopperMap';
import InfoComponent from '../InfoComponent/InfoComponent';
import ProfileComponent from '../Profile/ProfileComponent.jsx'
import LeaderboardComponent from '../Leaderboard/LeaderComponent.jsx';
import Navigationbar from '../Navigation/Navigationbar';
import PlayerInfo from '../PlayerInfo/PlayerInfo';

class GameContainer extends React.Component{
    state = {
        renderInfo: false,
        renderProfile: false,
        renderLeader: false,
        renderPlayerInfo: false
    };

    renderPlayerInfo = () => {
        this.setState({
            renderPlayerInfo: true
        })
    };

    leavePlayerInfo = () => {
        this.setState({
            renderPlayerInfo: false
        })
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
        return (
            <div>
                <Navigationbar
                                renderLeader={this.renderLeader}
                                renderInfo={this.renderInfo}
                                renderProfile={this.renderProfile}
                                renderPlayerInfo={this.renderPlayerInfo}
                />
                <CopperMap state={this.props.state}
                           addRoof={this.props.addRoof}
                           roofAlreadyStolen={this.props.roofAlreadyStolen}
                />

                <InfoComponent
                    renderInfo={this.state.renderInfo}
                    leaveInfo={this.leaveInfo}
                />

                <ProfileComponent
                    renderProfile={this.state.renderProfile}
                    leaveProfile={this.leaveProfile}
                />
                <LeaderboardComponent
                    renderLeader={this.state.renderLeader}
                    leaveLeader={this.leaveLeader}
                    getLeader={this.props.getLeader}
                    getLeaderboard={this.props.getLeaderboard}
                />
                <PlayerInfo renderPlayerInfo={this.state.renderPlayerInfo}
                            leavePlayerInfo={this.leavePlayerInfo}
                            state={this.props.state}
                />
            </div>
        )
    }
}
export default GameContainer;