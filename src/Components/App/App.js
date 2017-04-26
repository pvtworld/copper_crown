import React from 'react'
import CopperMap from '../CopperMap/CopperMap';
import firebase from '../../Firebase/firebase';
import base from '../../Firebase/base';

export default class App extends React.Component {
    constructor(){
        super();
        this.addPoints = this.addPoints.bind(this);
    }

    state = {
        authed: false,
        userInfo : {
            points: 0,
        }
    }

    componentWillMount() {
        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true
                });

                this.ref = base.syncState(`users/${user.uid}`, {
                    context: this,
                    state: 'userInfo'
                });

                console.log('User IS auth');
            } else {
                this.setState({
                    authed: false
                });
                console.log("User is NOT auth")
            }
        })
    }


    componentDidMount () {
    }


    componentWillUnmount () {
        this.removeListener()
        base.removeBinding(this.ref);

    }

    addPoints(newPoints) {
        console.log("points is:")
        console.log(newPoints);

        const userInfo= {...this.state.userInfo};
        userInfo.points += newPoints;
        // set state
        this.setState({ userInfo });
    }

    render() {
        return (
            <CopperMap
                state={this.state}
                addPoints={this.addPoints}
            />
        );
    }
}