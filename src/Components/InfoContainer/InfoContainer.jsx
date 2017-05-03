import React from 'react';
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import RoofInfo from "../RoofInfo/RoofInfo";

export default class InfoContainer extends React.Component {

    render() {
        if(this.props.displayRoof) {
            return (
                <div>
                    <RoofInfo
                        id={this.props.roofInfo.id}
                        value={Math.round(this.props.roofInfo.area * 0.00234)}
                        area={this.props.roofInfo.area}
                        leaveCallback={this.props.leaveRoof}
                        stealCallback={this.props.stealRoof}
                        roofAlreadyStolen={this.props.roofAlreadyStolen}
                    />
                </div>
            );
        }

        return (
            <PlayerInfo state={this.props.state} isLoadingCopper={this.props.isLoadingCopper}/>
        );
    }
}