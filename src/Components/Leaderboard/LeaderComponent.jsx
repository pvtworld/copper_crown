import React from 'react';
import './LeaderComponent.css'
import {Button} from 'react-bootstrap'

export default class LeaderComponent extends React.Component{
    render(){
        const back = <Button bsStyle="primary" onClick={this.props.leaveLeader}>Back</Button>;
        const leader = <Button bsStyle="primary" onClick={this.props.getLeader}>Print leaderboard in console</Button>;

        if(this.props.renderLeader){
            return(
                <div className="leader-box">
                    {back}
                    <div>
                        {leader}
                    </div>
                    <div>
                        <h3>Leaderboard Component</h3>
                    </div>
                </div>
            )
        }
        return null;
    }
}