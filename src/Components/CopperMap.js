import React, { Component } from 'react';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    Polygon
} from "react-google-maps";

const outerCoords = [
    {lat: 59.329450, lng: 18.0648328}, // north west
    {lat: 59.3294757, lng: 18.0848350}, // south west
    {lat: 59.3894812, lng: 18.0648332}, // south east
    {lat: 59.329481, lng: 18.0648406}  // north east
];
const GettingStartedGoogleMap = withGoogleMap(props => (

    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={13}
        defaultCenter={{ lat: 59.334591, lng: 18.063240 }}
        onClick={props.onMapClick}
    >
        {props.markers.map(marker => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(marker)}
            />

        ))}
        <Polygon path={outerCoords} />
    </GoogleMap>
));

export default class CopperMap extends Component {

    state = {
        markers: [{
            position: {
                lat: 59.334591,
                lng: 18.063240,
            },
            key: `Stockholm`,
            defaultAnimation: 2,
        }],
    };


    handleMapLoad = this.handleMapLoad.bind(this);
    handleMapClick = this.handleMapClick.bind(this);
    handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log(map.getZoom());
        }
    }

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
            },
        ];
        this.setState({
            markers: nextMarkers,
        });
    }

    handleMarkerRightClick(targetMarker) {
        /*
         * All you modify is data, and the view is driven by data.
         * This is so called data-driven-development. (And yes, it's now in
         * web front end and even with google maps API.)
         */
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    }

    render() {
        return (
            <div style={{height: `100%`}}>

                <GettingStartedGoogleMap
                    containerElement={
                        <div style={{ height: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    onMapLoad={this.handleMapLoad}
                    onMapClick={this.handleMapClick}
                    markers={this.state.markers}
                    onMarkerRightClick={this.handleMarkerRightClick}

                />

            </div>
        );
    }
}