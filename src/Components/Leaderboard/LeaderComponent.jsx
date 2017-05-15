import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, dataToJS, pathToJS} from 'react-redux-firebase';
import { Grid, Button, Modal} from 'react-bootstrap';
import LeaderboardList from './LeaderboardList';
import CurrentRank from './CurrentRank';
import { resetModal } from '../../Redux/Actions/navigationActions';

class LeaderComponent extends Component{

    constructor(){
        super();
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getMyTeamRank = this.getMyTeamRank.bind(this);
        this.getLeaderboardInfo = this.getLeaderboardInfo.bind(this);
        this.getUnsortedInfo = this.getUnsortedInfo.bind(this);
    }

    getUnsortedInfo() {
        var unsortedUserInfo = this.props.users;
        var idArray = Object.keys(unsortedUserInfo);
        var dataArray = Object.values(unsortedUserInfo);
        for (var i = 0; i < dataArray.length; i++){
            dataArray[i].userId=idArray[i];
        }
        return dataArray;
    }

    getUserInfo(unsortedInfo) {
        var teamNames = [];
        unsortedInfo.forEach((player) => {
            if (teamNames.indexOf(player.team) === -1){
                teamNames.push(player.team);
            }
        });
        var teamScores = [];
        teamNames.forEach((team) => {
            var totalScore = 0;
            unsortedInfo.forEach((player) => {
                if (player.team === team){
                    totalScore += player.points;
                }
            });
            teamScores.push(totalScore);
        });
        var teamData = [];
        for (var i = 0; i < teamNames.length; i++){
            teamData.push({
                teamId: teamNames[i],
                points: teamScores[i]
            });
        }
        return teamData.sort(function(a, b) {return b.points - a.points});
    };

    getMyTeamRank(extractedTeamInfo, rawInfo){
        var myRank = undefined;
        var myTeam;
        rawInfo.forEach((player) => {
            if (player.userId === this.props.auth.uid){
                myTeam = player.team;
            }
        });
        for (var i = 0; i < extractedTeamInfo.length; i++){
            if (extractedTeamInfo[i].teamId === myTeam){
                myRank = i + 1;
                break;
            }
        }
        return myRank;
    }

    getLeaderboardInfo(extractedTeamInfo){
        var leaderboardItems = [];
        var i = 1;
        while (i <= extractedTeamInfo.length && i <= 10){
            var teamName;
            for (var team in this.props.teams){
                if (extractedTeamInfo[i-1].teamId === team){
                    teamName = this.props.teams[team].teamName;
                }
            }
            leaderboardItems.push({
                pos: i,
                name: teamName,
                points: extractedTeamInfo[i-1].points
            });
            i++;
        }
        return leaderboardItems;
    }

    render(){

        if (this.props.requestingUsers){
            return <div></div>;
        } else {
            var unsortedInfo = this.getUnsortedInfo();
            var sortedTeamInfo = this.getUserInfo(unsortedInfo);
            var leaderboardInfo = this.getLeaderboardInfo(sortedTeamInfo);
            var rankInfo = this.getMyTeamRank(sortedTeamInfo, unsortedInfo);

            return(
                <div className="static-modal">

                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Leaderboard</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Grid>
                                <LeaderboardList listItems={leaderboardInfo} />
                                <CurrentRank rank={rankInfo} />
                            </Grid>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={() => this.props.dispatch(resetModal())}>OK</Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>
            )
        }
    }
}

var wrappedUserInfo = firebaseConnect(
    ['/users', '/teams']
)(LeaderComponent);

export default connect(
    ({firebase}) => ({
        users: dataToJS(firebase, 'users'),
        teams: dataToJS(firebase, 'teams'),
        auth: pathToJS(firebase, 'auth'),
        requestingUsers: pathToJS(firebase, 'requesting/users')
    })
)(wrappedUserInfo);
