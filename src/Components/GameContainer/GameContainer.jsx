import React from 'react';
import {connect} from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import ScoreComponent from '../ScoreComponent/ScoreComponent'
import CopperMap from '../CopperMap/CopperMap';
import Navigationbar from '../Navigation/Navigationbar';
import UsernameChooser from '../UsernameChooser/UsernameChooser';
//import { showUsernameModal } from '../../Redux/Actions/userActions';

class GameContainer extends React.Component{

    render() {
        console.log('user from gamecontainer', this.props.user);
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
        showNewUserModal: state.showNewUserModal.show,
        user: dataToJS(state.firebase, 'users')
    }
})(firebaseConnect(
    ['/users']
)(GameContainer));