import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, dataToJS, pathToJS} from 'react-redux-firebase';
import {Grid, Button} from 'react-bootstrap';
import LeaderHeading from './LeaderHeading';
import LeaderboardList from './LeaderboardList';
import CurrentRank from './CurrentRank';

class LeaderComponent extends Component{

    constructor(){
        super();
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getMyRank = this.getMyRank.bind(this);
        this.getLeaderboardInfo = this.getLeaderboardInfo.bind(this);
    }

    getUserInfo() {
        var unsortedUserInfo = this.props.users;
        var idArray = Object.keys(unsortedUserInfo);
        var dataArray = Object.values(unsortedUserInfo);
        for (var i = 0; i < dataArray.length; i++){
            dataArray[i].userId=idArray[i];
        }
        return dataArray.sort(function(a, b) {return b.points - a.points});
    };

    getMyRank(sortedUserInfo){
        var myRank = undefined;
        for (var i = 0; i < sortedUserInfo.length; i++){
            if (sortedUserInfo[i].userId === this.props.auth.uid){
                myRank = i + 1;
                break;
            }
        }
        return myRank;
    }

    getLeaderboardInfo(sortedUserInfo){
        var listItems = [];
        var i = 1;
        while (i <= sortedUserInfo.length && i <= 10){
            listItems.push({
                pos: i,
                name: sortedUserInfo[i-1].userId,
                points: sortedUserInfo[i-1].points
            });
            i++;
        }
        return listItems;
    }

    render(){
        const back = <Button bsStyle="primary" onClick={this.props.leaveLeader}>Close</Button>;
        const leader = <Button bsStyle="primary" onClick={this.props.getLeader}>Print leaderboard in console</Button>;

        if(this.props.renderLeader){

            var sortedUserInfo = this.getUserInfo();
            var myRank = this.getMyRank(sortedUserInfo);
            var listItems = this.getLeaderboardInfo(sortedUserInfo);

            return(
                <div className="navpage-box">
                    {back}
                    <div>
                        {leader}
                    </div>
                    <div>
                        <Grid>
                            <LeaderHeading/>
                            <LeaderboardList listItems={listItems} />
                            <CurrentRank rank={myRank} />
                        </Grid>
                    </div>
                </div>
            )
        }
        return null;
    }
}

var wrappedUserInfo = firebaseConnect(
    ['/users']
)(LeaderComponent);

export default connect(
    ({firebase}) => ({
        users: dataToJS(firebase, 'users'),
        auth: pathToJS(firebase, 'auth')
    })
)(wrappedUserInfo);