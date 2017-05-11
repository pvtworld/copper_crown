import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    geoError,
    geoOptions,
    checkClickForCopper
} from '../../Helpers/GeoHelpers';
import InfoContainer from "../InfoContainer/InfoContainer";
import GameMap from "../GameMap/GameMap";
import {searchForCopper} from '../../Redux/Actions/copperMapActions';
import store from '../../Redux/store';

class CopperMap extends Component {
    constructor() {
        super();
        this.handleMapClick = this.handleMapClick.bind(this);
        this.state = {
            center: {
                lat: 59.334591,
                lng: 18.063240,
            },
            //isLoadingCopper: false
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

                this.setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                });

                navigator.geolocation.clearWatch(watchPositionId);
            }

            navigator.geolocation.getCurrentPosition(geoSucess, geoError, geoOptions)

            this.geoTimer = setInterval(function () {
                watchPositionId = navigator.geolocation.watchPosition(geoSucess, geoError, geoOptions);
            }, 5000);

        } else {
            alert("Turn on GPS")
        }
    }

    componentDidMount() {
        this.geoLocationWatcher();

    }

    componentWillUnmount() {
        clearInterval(this.geoTimer);
    }


    render() {
        console.log('Copper-props', this.props);
        console.log('Copper-lat', this.props.searchPos.lat);
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
                            onMapClick={this.handleMapClick}
                            handleRoof={this.handleRoof}
                            center={this.state.center}
                            content={this.state.content}
                            radius={this.state.radius}
                        />

                    </div>


                </div>
                <InfoContainer
                    roofInfo={this.state.roofInfo}
                    displayRoof={this.state.displayRoof}
                    state={this.props.state}
                    isLoadingCopper={this.state.isLoadingCopper}
                    stealRoof={this.stealRoof}
                    leaveRoof={this.leaveRoof}
                    roofAlreadyStolen={this.props.roofAlreadyStolen}
                />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        searchPos: state.searchPos
    }
})(CopperMap);
