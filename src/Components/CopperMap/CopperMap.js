import React, {Component} from 'react';
import { geoError, geoOptions} from '../../Helpers/GeoHelpers';
import InfoContainer from "../InfoContainer/InfoContainer";
import GameMap from "../GameMap/GameMap";
import {connect} from 'react-redux';
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import { showUsernameModal } from '../../Redux/Actions/userActions';

class CopperMap extends Component {
    constructor() {
        super();
        this.state = {
            isMounted: false,
            center: {
                lat: 59.334591,
                lng: 18.063240,
            },
        };
    }
    
    geoTimer = null;

    geoLocationWatcher = this.geoLocationWatcher.bind(this);


    geoLocationWatcher() {
        if (navigator.geolocation) {

            let watchPositionId;

            const geoSucess = (position) => {
                console.log("Successssssss! Located user at: ");
                //console.log(position);

                if(this.state.isMounted){
                    this.setState({
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                    });
                }

                navigator.geolocation.clearWatch(watchPositionId);
            }

            navigator.geolocation.getCurrentPosition(geoSucess, geoError, geoOptions);

            this.geoTimer = setInterval(function () {
                watchPositionId = navigator.geolocation.watchPosition(geoSucess, geoError, geoOptions);
            }, 5000);

        } else {
            alert("Turn on GPS")
        }
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        })
        this.geoLocationWatcher();

    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        })
        clearInterval(this.geoTimer);
    }

    componentWillUpdate(){
        if(this.props.userInfo && (this.props.userInfo.username === 'NOT_SET') && (this.props.showNewUserModal !== true)){
            this.props.dispatch(showUsernameModal());
        }
    }


    render() {
        return (
            <div>
                <div className="map">
                    <div style={{height: `100%`}}>

                        <GameMap
                            containerElement={
                                <div style={{height: `100%`}}/>
                            }
                            mapElement={
                                <div style={{height: `100%`}}/>
                            }
                            center={this.state.center}
                            content={this.state.content}
                            radius={this.state.radius}
                        />

                    </div>


                </div>
                <InfoContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state, {auth}) => {
    return {
        userInfo: auth ? dataToJS(state.firebase, `users/${auth.uid}`) : undefined
    }
}

const propsConnected = connect(mapStateToProps)(CopperMap)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}` : '/']))(propsConnected);

const authConnected = connect(
    (state) => ({
        showNewUserModal: state.showNewUserModal.show
    })
)(wrappedPlayerInfo)

export default authConnected
