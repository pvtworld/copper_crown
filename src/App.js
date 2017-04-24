import React, { Component } from 'react';
import './App.css';
import CopperMap from './Components/CopperMap'
import Login from './Components/Login'

class App extends Component {
    render() {
        return (
            <div>
                <CopperMap/>
                {/*<Login/>*/}
            </div>
        );
    }
}
export default App;