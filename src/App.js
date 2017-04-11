import React, { Component } from 'react';
import './App.css';
import CopperMap from './Components/CopperMap';

class App extends Component {
  render() {
    return (
    <div className="overlay">
        <CopperMap/>
    </div>
    );
  }
}

export default App;
