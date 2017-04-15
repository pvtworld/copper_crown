import React, { Component } from 'react';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    Polygon,
    Circle
} from "react-google-maps";
import canUseDOM from "can-use-dom";
import raf from "raf";

const geolocation = (
    canUseDOM && navigator.geolocation ?
        navigator.geolocation :
        ({
            getCurrentPosition(success, failure) {
                failure(`Your browser doesn't support geolocation.`);
            },
        })
);


const outerCoords = [
    {lat: 59.329450, lng: 18.0648328}, // north west
    {lat: 59.3294757, lng: 18.0848350}, // south west
    {lat: 59.3894812, lng: 18.0648332}, // south east
    {lat: 59.329481, lng: 18.0648406}  // north east
];




const GettingStartedGoogleMap = withGoogleMap(props => (


    <GoogleMap
        center={props.center}
        ref={props.onMapLoad}
        defaultZoom={13}
        defaultCenter={props.center}
        onClick={props.onMapClick}
    >
        {props.markers.map(marker => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(marker)}
            />

        ))}
        <Polygon path={outerCoords} />
        <Circle
            center={props.center}
            radius={props.radius}
            options={{
                fillColor: `red`,
                fillOpacity: 0.20,
                strokeColor: `red`,
                strokeOpacity: 1,
                strokeWeight: 1,
            }}
        />
    </GoogleMap>
));

export default class CopperMap extends Component {
    componentDidMount() {
        const tick = () => {
            if (this.isUnmounted) {
                return;
            }
            this.setState({ radius: Math.max(this.state.radius - 20, 0) });

            if (this.state.radius > 100) {
                raf(tick);
            }
        };
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

            raf(tick);
        }, (reason) => {
            if (this.isUnmounted) {
                return;
            }
            this.setState({
                center: {
                    lat: 60,
                    lng: 105,
                },
                content: `Error: The Geolocation service failed (${reason}).`,
            });
        });
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    state = {
        center: null,
        content: null,
        radius: 3000,
        markers: [{
            position: {
                lat: 59.334591,
                lng: 18.063240,
            },
            key: `Stockholm`,
            defaultAnimation: 2,
        }],
    };
    isUnmounted = false;


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
            <div className="overlay">
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
                    center={this.state.center}
                    content={this.state.content}
                    radius={this.state.radius}

                />

                </div>
            </div>
        );
    }
}