import React from 'react';
import {connect} from 'react-redux';
import RoofInfo from "../RoofInfo/RoofInfo";
import RoofStolen from '../RoofInfo/RoofStolen';
import RoofNotFound from '../RoofInfo/RoofNotFound';
import Spinner from 'react-spinkit';
import PlayerInfo from '../../Components/PlayerInfo/PlayerInfo';
import Leaderboard from '../../Components/Leaderboard/LeaderComponent';
import About from '../AboutComponent/AboutComponent';
import Profile from '../../Components/Profile/ProfileComponent'


var value = 'Calculating..';
var area;

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
            case 'SHOW_ABOUT':
                return <About/>
            default:
                return null;
        }

        switch (this.props.foundRoof){
            case true: 

                if(this.props.roofTaken){
                    return <RoofStolen/>
                }
                else{
                    area = (this.props.area / 1000000).toFixed(1) + 0;
                    value = (100 * area).toFixed(1) + 0;
                    return(
                    <div>
                        <RoofInfo
                            value={value}
                            area={area}
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
