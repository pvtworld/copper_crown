import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Components/Main';
import './index.css';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import CopperMap from './Components/CopperMap'
import Login from './Components/Login'

const app = document.getElementById('root');
const routes = <Router history={hashHistory}>
    <Route path="/">
        <Route path="coppermap" component={CopperMap}/>
        <IndexRoute component={Login}/>
    </Route>
</Router>;

ReactDOM.render(routes, app);