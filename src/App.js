import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CopperMap from './Components/CopperMap'
import Login from './Components/Login'


const App = () => {
  return (
      <Router>
        <div>
            <Route exact path="/" component={Login}/>
            <Route path="/coppermap" component={CopperMap}/>
        </div>
      </Router>
  );
};

export default App;
