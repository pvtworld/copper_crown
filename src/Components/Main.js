import React, { Component } from 'react';
import './Main.css';
import Nav from './Navigation';
//FOR FUTURE PURPOSE!

class App extends Component {
  render() {
    return (
        <div>
            <Nav/>
            <h2>This Main component holds all other components</h2>
            {this.props.children}
        </div>
    );
  }
}
export default App;
