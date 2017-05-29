import React from 'react';
import { connect } from 'react-redux';
import RoofInfo from "../RoofInfo/RoofInfo";
import RoofStolen from '../RoofInfo/RoofStolen';
import RoofNotFound from '../RoofInfo/RoofNotFound';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Leaderboard from '../Leaderboard/LeaderComponent';
import StolenRoofs from '../GameInfoComponent/GameInfoComponent';
import Profile from '../Profile/ProfileComponent'
import ChatComponent from '../ChatComponent/ChatComponent';
import GameStatistics from '../GameStatistics/GameStatisticsComponent';
import HelpComponent from '../HelpComponent';

class InfoContainer extends React.Component {
    render() {

        if(this.props.searching){
            return(
                <div className="loading-spinner">
                    <RefreshIndicator
                        size={60}
                        left={-30}
                        top={-30}
                        loadingColor="#FF9800"
                        status="loading"
                        style={{
                            display: 'inline-block',
                            position: 'relative',
                        }}
                    />
                </div>
            )
        }

        switch(this.props.showModalString){
            case 'SHOW_LEADERBOARD':
                return <Leaderboard/>
            case 'SHOW_PROFILE':
                return <Profile/>
            case 'SHOW_STOLEN_ROOFS':
                return <StolenRoofs/>
            case 'SHOW_GAME_CHAT':
                return <ChatComponent/>;
            case 'SHOW_STATISTICS':
                return <GameStatistics/>
            case 'SHOW_HELP':
                return <HelpComponent/>
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
