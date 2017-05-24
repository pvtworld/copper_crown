import React from 'react';
import {connect} from 'react-redux';
import ScoreComponent from '../ScoreComponent/ScoreComponent'
import CopperMap from '../CopperMap/CopperMap';
import Navigationbar from '../Navigation/Navigationbar';
import UsernameChooser from '../UsernameChooser/UsernameChooser';

class GameContainer extends React.Component{

    render() {
        const userModal = this.props.showNewUserModal ? <UsernameChooser/> : null;

        return (
            <div>
                <Navigationbar/>
                <ScoreComponent/>
                <CopperMap/>
                {userModal}
            </div>
        )
    }
}
export default connect( state => {
    return {
        showNewUserModal: state.showNewUserModal.show
    }
}
)(GameContainer);