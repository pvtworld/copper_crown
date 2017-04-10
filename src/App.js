import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

class App extends Component {
    static defaultProps = {
        center: {lat: 59.334591, lng: 18.063240},
        zoom: 13
    };
  render() {
    return (
    <div className="overlay">
        <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
        />

    </div>
    );
  }
}

export default App;
