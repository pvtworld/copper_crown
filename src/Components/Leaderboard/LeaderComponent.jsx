import React, {Component} from 'react';
import './LeaderComponent.css';
import LeaderHeading from './LeaderHeading';
import LeaderboardList from './LeaderboardList';
import CurrentRank from './CurrentRank';
import {Grid, Button} from 'react-bootstrap';

var pos = 1;

//var names = ["Agata Agatasson", "Bertil Bertilsson", "Cyntia Cyntiasson", "Dieter Dietersson", "Elna Elnasson", "Fredde Freddesson", "Greta Gretasson", "Henry Henrysson", "Ida Idasson", "Julius Juliusson"];
//var points = ["10000", "8000", "7000", "6000", "5000", "4000", "3000", "2000", "1000", "500"];

export default class LeaderComponent extends Component{

    getNewPos(){
        var newPos = pos;
        pos++;
        return newPos;
    }

    //Reset first ranking number at update
    componentWillUpdate(){
        pos = 1;
    }

    /*createItems () {
        var listItems = [];
        for (var i = 0; i < 10; i++){
            listItems.push({
                pos: this.getNewPos(),
                name: names[i],
                points: points[i]
            });
        }
        return listItems;
    }*/

    createItems () {
        var listItems = [];
        var databaseInfo = this.props.getLeaderboard();
        console.log('från databas: ', databaseInfo);
        console.log('från databas (sträng): ', databaseInfo.toString());
        console.log('typ: ', typeof  databaseInfo);
        console.log('längd: ', databaseInfo.length);
        console.log('första elementet: ', databaseInfo[0]);
        /*
        for (var i = 0; i < 4; i++){
            listItems.push({
                pos: this.getNewPos(),
                name: databaseInfo[i].key,
                points: databaseInfo[i].points
            });
        }
        */
        return listItems;
    }

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
                        <Grid>
                            <LeaderHeading/>
                            <LeaderboardList listItems={this.createItems()} />
                            <CurrentRank rank="847" />
                        </Grid>
                    </div>
                </div>
            )
        }
        return null;
    }
}
