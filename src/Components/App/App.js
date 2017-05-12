import React from 'react';
import { connect } from 'react-redux';
import { pathToJS } from 'react-redux-firebase';
import GameContainer from '../GameContainer/GameContainer';
import { browserHistory } from 'react-router'

class App extends React.Component {
    constructor(){
        super();
        this.renderLogin = this.renderLogin.bind(this);
    }


    renderLogin() {
        if(!this.props.auth){
            browserHistory.push('/')
        }
    }



    render() {
        console.log(this.props.auth);
        this.renderLogin();
        // check if they are no logged in at all
        
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