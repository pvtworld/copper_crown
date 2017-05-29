import React, {Component} from 'react';
import { geoError, geoOptions} from '../../Helpers/GeoHelpers';
import InfoContainer from "../InfoContainer/InfoContainer";
import GameMap from "../GameMap/GameMap";
//import _ from "lodash";


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

// initColourMap() {
//     var layer = new FusionTablesLayer({
//           query: {
//             select: 'geometry',
//             from: '1ertEwm-1bMBhpEwHhtNYT47HQ9k2ki_6sRa-UQ'
//           },
//           styles: [{
//             polygonOptions: {
//               fillColor: '#00FF00',
//               fillOpacity: 0.3
//             }
//           }, {
//             where: 'birds > 300',
//             polygonOptions: {
//               fillColor: '#0000FF'
//             }
//           }, {
//             where: 'population > 5',
//             polygonOptions: {
//               fillOpacity: 1.0
//             }
//           }]
//         });
//         layer.setMap(map);
//       }
    

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

export default CopperMap;
