import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Components/App/App';
import store from './Redux/store';
import './index.css';
import './Components/App/App.css';

const root = document.getElementById('root');

store.subscribe(() => {
    console.log(store.getState());
})

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , root);