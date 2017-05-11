import React from 'react';
import {connect} from 'react-redux';
import RoofInfo from "../RoofInfo/RoofInfo";
import RoofStolen from '../RoofStolen/RoofStolen'
import Spinner from 'react-spinkit'

var value = 'Calculating..';
var area;

class InfoContainer extends React.Component {

    render() {

        if(this.props.searching){
            return(
                <Spinner spinnerName="chasing-dots" noFadeIn />
            )
        }
        switch (this.props.foundRoof){
            case true: 

                if(this.props.roofTaken){
                    return <RoofStolen dispatch={this.props.dispatch}/>
                }
                else{

                }
                area = (this.props.area / 1000000).toFixed(1) + 0;
                value = (100 * area).toFixed(1) + 0;

            case false :
        }



            return (
                <div>
                    <RoofInfo
                        id={this.props.id}
                        value={value}
                        area={area}
                        leaveCallback={this.props.leaveRoof}
                        stealCallback={this.props.stealRoof}
                        roofAlreadyStolen={this.props.roofAlreadyStolen}
                    />
                </div>
            );
        }

    }
const mapStateToProps = (state) => {
    return {
        searching: state.copperSearch.searching,
        foundRoof : state.copperRoof.foundRoof,
        roofTaken : state.copperRoof.roofTaken,
        id: state.copperRoof.id,
        area: state.copperRoof.area
    }
}

export default connect(mapStateToProps)(InfoContainer);
