import React, {Component} from 'react';
import LeaderHeading from './LeaderHeading';
import LeaderboardList from './LeaderboardList';
import CurrentRank from './CurrentRank';
import {Grid} from 'react-bootstrap';

var pos = 1;

var names = ["Agata Agatasson", "Bertil Bertilsson", "Cyntia Cyntiasson", "Dieter Dietersson", "Elna Elnasson", "Fredde Freddesson", "Greta Gretasson", "Henry Henrysson", "Ida Idasson", "Julius Juliusson"];
var points = ["10000", "8000", "7000", "6000", "5000", "4000", "3000", "2000", "1000", "500"];

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

    createItems () {
        var listItems = [];
        for (var i = 0; i < 10; i++){
            listItems.push({
                pos: this.getNewPos(),
                name: names[i],
                points: points[i]
            });
        }
        return listItems;
    }
    
    render(){
        return (
            <Grid>
                <LeaderHeading/>
                <LeaderboardList listItems={this.createItems()} />
                <CurrentRank rank="847" />
            </Grid>
        );
    }
}