import React from 'react';
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import RoofInfo from "../RoofInfo/RoofInfo";

var value = 'Calculating..';

export default class InfoContainer extends React.Component {

    render() {
        if (this.props.displayRoof) {
            if (this.props.state.pricePerSquareMeter) {
                value = (this.props.state.pricePerSquareMeter * (this.props.roofInfo.area / 1000000)).toFixed(1) + 0;
            }

            return (
                <div>
                    <RoofInfo
                        id={this.props.roofInfo.id}
                        value={value}
                        area={this.props.roofInfo.area}
                        leaveCallback={this.props.leaveRoof}
                        stealCallback={this.props.stealRoof}
                        roofAlreadyStolen={this.props.roofAlreadyStolen}
                    />
                </div>
            );
        }

        return (
            <PlayerInfo state={this.props.state}/>
        );
    }
}