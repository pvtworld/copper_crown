import React, {Component} from 'react';
import './LeaderComponent.css';
import LeaderHeading from './LeaderHeading';
import LeaderboardList from './LeaderboardList';
import CurrentRank from './CurrentRank';
import {Grid, Button} from 'react-bootstrap';

//var names = ["Agata Agatasson", "Bertil Bertilsson", "Cyntia Cyntiasson", "Dieter Dietersson", "Elna Elnasson", "Fredde Freddesson", "Greta Gretasson", "Henry Henrysson", "Ida Idasson", "Julius Juliusson"];
//var points = ["10000", "8000", "7000", "6000", "5000", "4000", "3000", "2000", "1000", "500"];

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
        const back = <Button bsStyle="primary" onClick={this.props.leaveLeader}>Back</Button>;
        const leader = <Button bsStyle="primary" onClick={this.props.getLeader}>Print leaderboard in console</Button>;

        if(this.props.renderLeader){

            this.props.getLeaderboard(this.listCallback);

            return(
                <div className="leader-box">
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
