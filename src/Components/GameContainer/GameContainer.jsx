import React from 'react';
import CopperMap from '../CopperMap/CopperMap';
import Navigationbar from '../Navigation/Navigationbar';
import DeadClock from '../DeadlineClock/DeadlineClock'

class GameContainer extends React.Component{

    render() {
        return (
            <div>
                <Navigationbar/>
                <DeadClock/>
                <CopperMap/>
            </div>
        )
    }
}
export default GameContainer;