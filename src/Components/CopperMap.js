import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Circle} from "react-google-maps";
import {geolocation} from '../Helpers/GeoHelpers';

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

    handleMapClick = this.handleMapClick.bind(this);

    componentDidMount() {
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
            this.setState({
                center: {
                    lat: 59.334591,
                    lng: 18.063240,
                },
                content: `Error: The Geolocation service failed (${reason}).`,
            });
        });
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    handleMapClick(event) {
        console.log("Latitude:" + event.latLng.lat());
        console.log("Longitude:" + event.latLng.lng());
        console.log();
    }

    render() {
        return (
            <div className="overlay">
                <div style={{height: `100%`}}>

                <GameMap
                    containerElement={
                        <div style={{ height: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    onMapClick={this.handleMapClick}
                    center={this.state.center}
                    content={this.state.content}
                    radius={this.state.radius}

                />

                </div>
            </div>
        );
    }
}