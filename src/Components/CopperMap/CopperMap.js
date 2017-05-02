import React, {Component} from 'react';
import {geolocation, checkClickForCopper} from '../../Helpers/GeoHelpers';
import InfoContainer from "../InfoContainer/InfoContainer";
import {GameMap} from "../GameMap/GameMap";

export default class CopperMap extends Component {
    constructor() {
        super();

        this.state = {
            center: {
                lat: 59.334591,
                lng: 18.063240,
            },
            content: null,
            radius: 5
        };


    }

    isUnmounted = false;
    handleRoof = this.handleRoof.bind(this);
    handleMapClick = this.handleMapClick.bind(this);
    mapTimer = this.mapTimer.bind(this);
    stealRoof = this.stealRoof.bind(this);
    leaveRoof = this.leaveRoof.bind(this);
    roofCallback = this.roofCallback.bind(this);



    mapTimer() {
        geolocation.getCurrentPosition((position) => {
            if (this.isUnmounted) {
                return;
            }

            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                },
                content: `Location found using HTML5.`,
            });

        }, (reason) => {
            if (this.isUnmounted) {
                return;
            }
        });

    }

    componentDidMount() {
        this.mapTimer();
        setInterval(this.mapTimer, 5000);


    }

    componentWillUnmount() {
        this.isUnmounted = true;
        clearInterval(this.timer);
    }

    roofCallback(roof, alreadyStolen) {
        this.setState({
            displayRoof: !alreadyStolen,
            roofInfo: roof
        });
        if(alreadyStolen) {

        alert("Roof already Stolen")
        }
    }

    handleRoof(roof) {
        if (roof) {
            console.log("Roof present")
            this.props.roofAlreadyStolen(roof, this.roofCallback)
        } else {
            console.log("No Copper");
            this.setState({
                displayRoof: false
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

    handleMapClick(event) {
        console.log("checkForCopper Dispatched")
        checkClickForCopper(event.latLng.lng(), event.latLng.lat(), this.handleRoof);
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
                    stealRoof={this.stealRoof}
                    leaveRoof={this.leaveRoof}
                    roofAlreadyStolen={this.props.roofAlreadyStolen}
                />
            </div>
        );
    }
}

