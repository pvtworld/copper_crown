import React from 'react';
import { connect } from 'react-redux';
import { pathToJS } from 'react-redux-firebase';
import GameContainer from '../GameContainer/GameContainer';
import TeamChooser from '../TeamChooser/TeamChooser';
import { browserHistory } from 'react-router'
import { getPricePerSquareMeter, bindPriceMultiplier } from '../../Helpers/PointsHelpers';

class App extends React.Component {

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

    render() {

        this.redirectIfAuth(this.props);
        // check if they are no logged in at all
        console.log('Creating GameContainer');
        return ( <div>
                <TeamChooser/>
                  <GameContainer/>
            </div>
        )
    }
}

const mapStateToProps = ({firebase}) => {
    return {
        authError: pathToJS(firebase, 'authError'),
        auth: pathToJS(firebase, 'auth')
    }
}

export default (connect(mapStateToProps))(App)