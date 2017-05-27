import React from 'react';
import { connect } from 'react-redux';
import RoofInfo from "../RoofInfo/RoofInfo";
import RoofStolen from '../RoofInfo/RoofStolen';
import RoofNotFound from '../RoofInfo/RoofNotFound';
import Spinner from 'react-spinkit';

import PlayerInfo from '../PlayerInfo/PlayerInfo';
import Leaderboard from '../Leaderboard/LeaderComponent';
import GameInfo from '../GameInfoComponent/GameInfoComponent';
import Profile from '../Profile/ProfileComponent'
import ChatComponent from '../ChatComponent/ChatComponent';

class InfoContainer extends React.Component {

    render() {

        if(this.props.searching){
            return(
                <Spinner spinnerName="chasing-dots" noFadeIn />
            )
        }

        switch(this.props.showModalString){
            case 'SHOW_PLAYERINFO':
                return <PlayerInfo/>
            case 'SHOW_LEADERBOARD':
                return <Leaderboard/>
            case 'SHOW_PROFILE':
                return <Profile/>
            case 'SHOW_GAME_INFO':
                return <GameInfo/>
            case 'SHOW_GAME_CHAT':
                return <ChatComponent/>;
            default:
                break;
        }

        switch (this.props.foundRoof){
            case true: 

                if(this.props.roofTaken){
                    return <RoofStolen/>
                }
                else{
                    return(
                    <div>
                        <RoofInfo
                    />
                </div>
                )
                }


            case false :
                return <RoofNotFound/>
            default: 
                return null
            }
        }

    }
const mapStateToProps = (state) => {
    return {
        searching: state.copperSearch.searching,
        foundRoof : state.copperRoof.foundRoof,
        roofTaken : state.copperRoof.roofTaken,
        id: state.copperRoof.id,
        area: state.copperRoof.area,
        showModalString: state.showModal.showModalString
    }
}

export default connect(mapStateToProps)(InfoContainer);
