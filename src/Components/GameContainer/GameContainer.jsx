import React from 'react';
import ScoreComponent from '../ScoreComponent/ScoreComponent'
import CopperMap from '../CopperMap/CopperMap';
import Navigationbar from '../Navigation/Navigationbar';
import ChatComponent from '../ChatComponent/ChatComponent'

class GameContainer extends React.Component{

    render() {
        return (
            <div>
                <Navigationbar/>
                <ScoreComponent/>
                <CopperMap/>
            </div>
        )
    }
}
export default GameContainer;