import React from 'react';
import ReactDOM from 'react-dom';
import store from './Redux/store';
import './index.css';
import './Components/App/App.css';
import Root from './Components/App/Routes'

const root = document.getElementById('root');

store.subscribe(() => {
    console.log(store.getState());
})

ReactDOM.render(<Root store={store} />, root);

