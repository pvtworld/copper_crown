import React from 'react';
import RoofInfo from "../RoofInfo/RoofInfo";
import Spinner from 'react-spinkit'

var value = 'Calculating..';
var area;

export default class InfoContainer extends React.Component {

    render() {
        if (this.props.displayRoof) {
            if (this.props.state.pricePerSquareMeter) {
                area = (this.props.roofInfo.area / 1000000).toFixed(1) + 0;
                value = (this.props.state.pricePerSquareMeter * area).toFixed(1) + 0;
            }

            return (
                <div>
                    <RoofInfo
                        id={this.props.roofInfo.id}
                        value={value}
                        area={area}
                        leaveCallback={this.props.leaveRoof}
                        stealCallback={this.props.stealRoof}
                        roofAlreadyStolen={this.props.roofAlreadyStolen}
                    />
                </div>
            );
        }

        if(this.props.isLoadingCopper){
            return(
                <Spinner spinnerName="chasing-dots" noFadeIn />
            )
        }
        return null;
    }
}