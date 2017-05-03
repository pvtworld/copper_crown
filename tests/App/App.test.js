import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../../src/Components/App/App';


beforeAll(() => {
    // Clears the database and adds some testing data.
    // Jest will wait for this promise to resolve before running tests.
    return stubGoogleAPIS();
});

describe('Rendertests', () => {

    it('renders loginScreen when user not logged in', () => {
        const component = renderer.create(<App />);

        expect(component).toMatchSnapshot();
    })

    it('renders map when user logged in', () => {
        const component = shallow(<App/>);
        component.setState({authed : true});
        component.setState({uid : 1});
        component.setState({pricePerSquareMeter : null});

        console.log(component.state('authed'));
        console.log(component.state('uid'));
        console.log(component.state('pricePerSquareMeter'));
        
        expect(toJson(component)).toMatchSnapshot();
    })
})










// Stubbing the google Api below.

window.stubGoogleAPIS = function () {
    return window.google = {
        maps: {
            Animation: {},
            BicyclingLayer: function () {
            },
            Circle: function () {
            },
            ControlPosition: {},
            Data: function () {
            },
            DirectionsRenderer: function () {
            },
            DirectionsService: function () {
            },
            DirectionsStatus: {},
            DirectionsTravelMode: {},
            DirectionsUnitSystem: {},
            DistanceMatrixElementStatus: {},
            DistanceMatrixService: function () {
            },
            DistanceMatrixStatus: {},
            ElevationService: function () {
            },
            ElevationStatus: {},
            FusionTablesLayer: function () {
            },
            Geocoder: function () {
            },
            GeocoderLocationType: {},
            GeocoderStatus: {},
            GroundOverlay: function () {
            },
            ImageMapType: function () {
            },
            InfoWindow: function () {
            },
            KmlLayer: function () {
            },
            KmlLayerStatus: {},
            LatLng: function () {
            },
            LatLngBounds: function () {
            },
            MVCArray: function () {
            },
            MVCObject: function () {
            },
            Map: function () {
                return {
                    setTilt: function () {
                    },
                    mapTypes: {
                        set: function () {
                        }
                    },

                    setOptions:  function () {},
                    getZoom:  function () {},

                    overlayMapTypes: {
                        insertAt: function () {
                        },
                        removeAt: function () {
                        }
                    }
                };
            },
            MapTypeControlStyle: {},
            MapTypeId: {
                HYBRID: '',
                ROADMAP: '',
                SATELLITE: '',
                TERRAIN: ''
            },
            MapTypeRegistry: function () {
            },
            Marker: function () {
                return {
                    setMap: function () {

                    }
                }
            },
            MarkerImage: function () {
            },
            MaxZoomService: function () {
                return {
                    getMaxZoomAtLatLng: function () {
                    }
                };
            },
            MaxZoomStatus: {},
            NavigationControlStyle: {},
            OverlayView: function () {
            },
            Point: function () {
            },
            Polygon: function () {
            },
            Polyline: function () {
            },
            Rectangle: function () {
            },
            SaveWidget: function () {
            },
            ScaleControlStyle: {},
            Size: function () {
            },
            StreetViewCoverageLayer: function () {
            },
            StreetViewPanorama: function () {
            },
            StreetViewService: function () {
            },
            StreetViewStatus: {},
            StrokePosition: {},
            StyledMapType: function () {
            },
            SymbolPath: {},
            TrafficLayer: function () {
            },
            TransitLayer: function () {
            },
            TransitMode: {},
            TransitRoutePreference: {},
            TravelMode: {},
            UnitSystem: {},
            ZoomControlStyle: {},
            __gjsload__: function () {
            },
            event: {
                addListener: function () {
                }
            },
            places: {
                AutocompleteService: function () {
                    return {
                        getPlacePredictions: function () {
                        }
                    };
                }
            }
        }
    };
};


