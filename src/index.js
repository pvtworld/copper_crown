import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Components/Main';
import './index.css';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import CopperMap from './Components/CopperMap'
import Login from './Components/Login'
import NotFound from './Components/NotFound'

const root = document.getElementById('root');
const routes = <Router history={hashHistory}>
    <Route path="/">
        <Route path="coppermap" component={CopperMap}/>
        <Route path="main" component={Main}/>
        <IndexRoute component={Login}/>
        <Route path="*" component={NotFound} />
    </Route>
</Router>;

ReactDOM.render(routes, root);