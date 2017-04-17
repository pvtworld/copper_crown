import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CopperMap from './Components/CopperMap'
import Login from './Components/Login'
import Home from './Components/Home'

const App = () => {
  return (
      <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/coppermap" component={CopperMap}/>
        </div>
      </Router>
  );
};

export default App;
