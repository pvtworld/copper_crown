import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Circle} from "react-google-maps";
import {geolocation, checkClickForCopper} from '../../Helpers/GeoHelpers';
import InfoContainer from "../InfoContainer/InfoContainer";

const GameMap = withGoogleMap(props => (


    <GoogleMap
        center={props.center}
        defaultZoom={18}
        defaultCenter={props.center}
        onClick={props.onMapClick}
        options={{
            mapTypeControl: false,
            streetViewControl: false,
            // zoomControl: false,
            //draggable: false,
            //scrollwheel: false,
            //panControl: false,
            //maxZoom: 18,
            //minZoom: 18,
            //zoom: 18,
        }}

    >
        <Circle
            center={props.center}
            radius={props.radius}
            options={{
                fillColor: `red`,
                fillOpacity: 0.90,
                strokeColor: `red`,
                strokeOpacity: 0.50,
                strokeWeight: 2,
            }}
        />

        <Circle
            onClick={(event => (
                checkClickForCopper(event.latLng.lng(), event.latLng.lat(), props.handleRoof)
            ))
            }
            center={props.center}
            radius={100}
            options={{
                fillColor: `green`,
                fillOpacity: 0.10,
                strokeColor: `black`,
                strokeOpacity: 0.50,
                strokeWeight: 2,
            }}
        />

    </GoogleMap>
));

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

    handleRoof(roof) {
        if (roof) {
            console.log("Roof present")
            this.setState({
                displayRoof: true,
                roofInfo: roof
            });

        } else {
            console.log("No Copper");
            this.setState({
                displayRoof: false
            });

        }
    }

    stealRoof(points) {
        this.props.addPoints(points);
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
                <InfoContainer roofInfo={this.state.roofInfo} displayRoof={this.state.displayRoof} state={this.props.state} stealRoof={this.stealRoof}  leaveRoof={this.leaveRoof}/>
            </div>
        );
    }
}

