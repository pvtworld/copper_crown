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
        this.getMyRank = this.getMyRank.bind(this);
        this.getLeaderboardInfo = this.getLeaderboardInfo.bind(this);
    }

    getUserInfo() {
        var unsortedUserInfo = this.props.users;
        console.log('raw user infooooo:', unsortedUserInfo);
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
            var sortedUserInfo = this.getUserInfo();
            var myRank = this.getMyRank(sortedUserInfo);
            var listItems = this.getLeaderboardInfo(sortedUserInfo);

            return(
                this.props.requestingUsers ? <div></div> :
                <div className="static-modal">

                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Leaderboard</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Grid>
                                <LeaderboardList listItems={listItems} />
                                <CurrentRank rank={myRank} />
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

var wrappedUserInfo = firebaseConnect(
    ['/users']
    //['/users#orderByChild=points']
    //[{path: '/users', queryParams: ['orderByChild=points']}]
    //[{path: '/users', queryParams: ['orderByChild=points', 'equalTo=1963253']}]
)(LeaderComponent);

export default connect(
    ({firebase}) => ({
        users: dataToJS(firebase, 'users'),
        auth: pathToJS(firebase, 'auth'),
        requestingUsers: pathToJS(firebase, 'requesting/users')
    })
)(wrappedUserInfo);
