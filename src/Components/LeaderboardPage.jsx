import React, {Component} from 'react';
import LeaderHeading from './LeaderHeading.jsx';
import LeaderboardItem from './LeaderboardItem.jsx';
import CurrentRank from './CurrentRank.jsx';
import {Grid} from 'react-bootstrap';

var pos = 1;

export default class LeaderboardPage extends Component{

    getNewPos(){
        var newPos = pos;
        pos++;
        return newPos;
    }

    //Reset first ranking number at update
    componentWillUpdate(){
        pos = 1;
    }

    render(){
        return (
            <Grid>
                <LeaderHeading/>
                <LeaderboardItem pos={this.getNewPos()} name="Agata Agatasson" points="9000" />
                <LeaderboardItem pos={this.getNewPos()} name="Bertil Bertilsson" points="8000" />
                <LeaderboardItem pos={this.getNewPos()} name="Cyntia Cyntiasson" points="7000" />
                <LeaderboardItem pos={this.getNewPos()} name="Dieter Dietersson" points="6000" />
                <LeaderboardItem pos={this.getNewPos()} name="Elna Elnasson" points="5000" />
                <LeaderboardItem pos={this.getNewPos()} name="Fredde Freddesson" points="4000" />
                <LeaderboardItem pos={this.getNewPos()} name="Greta Gretasson" points="3000" />
                <LeaderboardItem pos={this.getNewPos()} name="Henry Henrysson" points="2000" />
                <LeaderboardItem pos={this.getNewPos()} name="Ida Idasson" points="1000" />
                <LeaderboardItem pos={this.getNewPos()} name="Julius Juliusson" points="500" />
                <CurrentRank rank="847" />
            </Grid>
        );
    }
}