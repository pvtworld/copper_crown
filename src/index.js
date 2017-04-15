import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import App from './App';
import CopperMap from './Components/CopperMap'
import Login from './Components/Login'
import './index.css';


const routes = <Router history={hashHistory}>
    <Route path="/">
        <Route path="coppermap" component={CopperMap}/>
        <IndexRoute component={Login}/>
    </Route>
</Router>;
const app = document.getElementById('root');

ReactDOM.render(routes, app);
