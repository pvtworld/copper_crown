import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Circle} from "react-google-maps";
import {geolocation, checkClickForCopper} from '../../Helpers/GeoHelpers';
import UserScore from "../UserScore/UserScore"

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
            onClick={(event => (
                console.log(event.latLng.lat() + " "+ event.latLng.lng())
            ))

            }
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
                checkClickForCopper(event.latLng.lng(), event.latLng.lat())
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



    timer() {
        geolocation.getCurrentPosition((position) => {
            if (this.isUnmounted) {
                return;
            }

            console.log("Latitude:" + position.coords.latitude);
            console.log("Longitude:" + position.coords.longitude);
            console.log();

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

    componentDidMount() {
        setInterval(this.timer.bind(this), 5000);


    }

    componentWillUnmount() {
        this.isUnmounted = true;
        clearInterval(this.timer);
    }

    handleRoof(roof) {
        if(roof) {
            console.log(roof.id)
            console.log(roof.area)
            this.props.addPoints(roof.area)
        } else {
            console.log("No Copper")
        }
    }

    handleMapClick(event) {
        this.props.addPoints(45)
        checkClickForCopper(event.latLng.lng(), event.latLng.lat(), this.handleRoof)
    }

    render() {
        return (
            <div>
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
                <UserScore state={this.props.state}/>
            </div>
        );
    }
}