import React, {Component} from 'react';
import LeaderHeading from './LeaderHeading';
import LeaderboardList from './LeaderboardList';
import CurrentRank from './CurrentRank';
import {Grid, Button} from 'react-bootstrap';

export default class LeaderComponent extends Component{

    constructor (){
        super();
        this.listCallback = this.listCallback.bind(this);
        this.state = {
            leaderboard: [],
            currentRank: undefined
        };
    }

    listCallback (leaderbordInfo, rank) {
        this.setState({
            leaderboard: leaderbordInfo,
            currentRank: rank
        });
    }

    render(){
        const back = <Button bsStyle="primary" onClick={this.props.leaveLeader}>Close</Button>;
        const leader = <Button bsStyle="primary" onClick={this.props.getLeader}>Print leaderboard in console</Button>;

        if(this.props.renderLeader){

            this.props.getLeaderboard(this.listCallback);

            return(
                <div className="navpage-box">
                    {back}
                    <div>
                        {leader}
                    </div>
                    <div>
                        <Grid>
                            <LeaderHeading/>
                            <LeaderboardList listItems={this.state.leaderboard} />
                            <CurrentRank rank={this.state.currentRank} />
                        </Grid>
                    </div>
                </div>
            )
        }
        return null;
    }
}