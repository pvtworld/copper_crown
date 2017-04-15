import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Components/Main';
import './index.css';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
import CopperMap from './Components/CopperMap'
import Login from './Components/Login'

const root = document.getElementById('root');
const routes = <Router history={browserHistory}>
    <Route path="/pvt/">
        <Route path="coppermap" component={CopperMap}/>
        <Route path="main" component={Main}/>
        <IndexRoute component={Login}/>
    </Route>
</Router>;

ReactDOM.render(routes, root);