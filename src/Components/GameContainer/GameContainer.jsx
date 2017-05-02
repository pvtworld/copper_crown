import React from 'react'
import CopperMap from '../CopperMap/CopperMap'

export default class GameContainer extends React.Component{
    render() {
        const logout = <button onClick={this.props.logout}>Log Out!</button>;
        const leaderboard = <button onClick={this.props.getLeader}>Print Leaderboard in console</button>;
        return (
            <div>
                <CopperMap state={this.props.state}
                           addRoof={this.props.addRoof}
                           roofAlreadyStolen={this.props.roofAlreadyStolen}
                />
                {logout}{leaderboard}
            </div>
        )
    }
}