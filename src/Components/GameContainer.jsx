import React from 'react';
import NavigationContainer from './NavigationContainer';
import CopperMap from './CopperMap'

class GameContainer extends React.Component{

    render() {
        return (
            <div>
                <NavigationContainer/>
                <CopperMap/>
            </div>
        );
    }
}

export default GameContainer;