import React from 'react';
import { connect } from 'react-redux';
import {pathToJS} from 'react-redux-firebase'
import GameContainer from '../GameContainer/GameContainer';
import TeamChooser from '../TeamChooser/TeamChooser';
import { browserHistory } from 'react-router'
import { getPricePerSquareMeter, bindPriceMultiplier } from '../../Helpers/PointsHelpers';


class App extends React.Component {

    constructor(){
        super();
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            showUsernameModal: true
        }
    }

    componentDidMount(){
        getPricePerSquareMeter(this.props.dispatch);
        bindPriceMultiplier(this.props.dispatch);

    }

    redirectIfAuth = (props) => {

        if(!props.auth){
            console.log('User is not auth, redirecting to login /', props.auth);
            browserHistory.push('/')
        }else{
            console.log('User is auth, doing nothing');

        }
}

    handleClose(){
        this.setState({
        showUsernameModal: false}
    )};


    render() {
        this.redirectIfAuth(this.props);
        // check if they are no logged in at all
        console.log('Creating GameContainer');
        if (this.state.showUsernameModal){
            return ( <div>
                    <TeamChooser onClose={this.handleClose}/>
                    <GameContainer/>
                </div>
            )
        } else {
            return ( <div>
                    <GameContainer/>
                </div>
            )
        }
    }
}

const mapStateToProps = ({firebase}) => {
    return {
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth'),
        firebase: firebase
    }
}

export default (connect(mapStateToProps))(App)