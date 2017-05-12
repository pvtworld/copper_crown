import React from 'react';
import { connect } from 'react-redux';
import { pathToJS } from 'react-redux-firebase';
import LoginContainer from '../LoginContainer/LoginContainer';
import GameContainer from '../GameContainer/GameContainer';
import { getPricePerSquareMeter } from '../../Helpers/PointsHelpers';

class App extends React.Component {
    constructor(props){
        super(props);
        this.renderLogin = this.renderLogin.bind(this);
    }


    renderLogin() {
        return (
            <LoginContainer/>
        )
    }

    componentDidMount(){
        getPricePerSquareMeter(this.props.dispatch);
    }



    render() {
        

        console.log(this.props.auth);
        // check if they are no logged in at all
        if(!this.props.auth) {
            return <div>{this.renderLogin()}</div>
        }
        
        console.log('Creating GameContainer');
        return (
            <div>
                <GameContainer state={this.state}/>
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