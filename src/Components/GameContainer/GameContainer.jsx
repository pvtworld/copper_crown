import React from 'react';

import CopperMap from '../CopperMap/CopperMap';
import Navigationbar from '../Navigation/Navigationbar';

class GameContainer extends React.Component{

    render() {
        return (
            <div>
                <Navigationbar/>
                <CopperMap/>
            </div>
        )
    }
}
export default GameContainer;