import React from 'react';
import {withGoogleMap, GoogleMap, Circle, Marker} from "react-google-maps";
import {checkClickForCopper} from '../../Helpers/GeoHelpers';

export const GameMap = withGoogleMap(props => (


    <GoogleMap
        center={props.center}
        defaultZoom={17}
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

        <Marker
            defaultPosition={props.center}
            position={props.center}
            title="Click to zoom"
            icon={{url: '/images/racoon.png',
                scaledSize: {width: 40, height: 40},
                size: {width: 360, height: 330},
                anchor: {x:20, y:20}

            }}
            onClick={props.onMarkerClick}
        />

    </GoogleMap>
));