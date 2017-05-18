import React from 'react';
import ReactDOM from 'react-dom';
import store from './Redux/store';
import './index.css';
import './Components/App/App.css';
import Root from './Components/App/Root'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const root = document.getElementById('root');

ReactDOM.render(
    <MuiThemeProvider>
        <Root store={store} />
    </MuiThemeProvider>
    , root);
