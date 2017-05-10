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

store.subscribe(() => {
    var newState = store.getState();
    var map = new CopperMap();
    if (newState.searchingForCopper === true){
        checkClickForCopper(newState.searchPos.long, newState.searchPos.lat, map.handleRoof);
    }
});

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

    handleRoof = this.handleRoof.bind(this);
    handleMapClick = this.handleMapClick.bind(this);
    geoLocationWatcher = this.geoLocationWatcher.bind(this);
    stealRoof = this.stealRoof.bind(this);
    leaveRoof = this.leaveRoof.bind(this);
    roofCallback = this.roofCallback.bind(this);

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

    roofCallback(roof, alreadyStolen) {
        this.setState({
            displayRoof: !alreadyStolen,
            roofInfo: roof
        });
        if (alreadyStolen) {

            alert("Roof already Stolen")
        }
    }

    handleRoof(roof) {
        if (roof) {
            console.log("Roof present")
            this.props.dispatch(searchForCopper(false));
            this.props.roofAlreadyStolen(roof, this.roofCallback)
        } else {
            console.log("No Copper");
            this.props.dispatch(searchForCopper(false));
            this.setState({
                displayRoof: false,
            });

        }
    }

    stealRoof(points, area, id) {
        this.props.addRoof(points, area, id)
        this.leaveRoof();
    }

    leaveRoof() {
        this.setState({
            displayRoof: false,
            roofInfo: null
        });

    }

    handleMapClick() {
        console.log("checkForCopper Dispatched")
        console.log('Copper-lat', this.props.searchPos.lat);
        checkClickForCopper(this.props.searchPos.long, this.props.searchPos.lat, this.handleRoof);
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
