import React from 'react';

import CopperMap from '../CopperMap/CopperMap';
import Navigationbar from '../Navigation/Navigationbar';

class GameContainer extends React.Component{

    render() {
        return (
            <div>
                <Navigationbar/>
                <CopperMap
                    state={this.props.state}
                    addRoof={this.props.addRoof}
                    roofAlreadyStolen={this.props.roofAlreadyStolen}
                />
            </div>
        )
    }
}
export default GameContainer;