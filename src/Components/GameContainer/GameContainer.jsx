import React from 'react'
import CopperMap from '../CopperMap/CopperMap'
import InfoComponent from '../Info/InfoComponent'
import {Navbar, NavItem, Nav} from 'react-bootstrap'

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

    render() {
        const logout = <button onClick={this.props.logout}>Log Out!</button>;
        const leaderboard = <button onClick={this.props.getLeader}>Print Leaderboard in console</button>;
        const info = <button onClick={this.renderInfo}>Info</button>;

        if(this.state.renderInfo){
            return(<InfoComponent leaveInfo={this.leaveInfo}/>)
        }

        return (
            <div>
                <CopperMap state={this.props.state}
                           addRoof={this.props.addRoof}
                           roofAlreadyStolen={this.props.roofAlreadyStolen}
                />
                {logout}{leaderboard}{info}
            </div>
        )
    }
}