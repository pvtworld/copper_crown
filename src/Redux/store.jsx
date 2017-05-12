import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase'
import reducers from './Reducers/combiner';
import logger from 'redux-logger';

const firebaseConfig = {
    apiKey: "AIzaSyBxf-SMmqau97RBu5y4f4a62OQBWLwevUM",
    authDomain: "coppercrown-a18fd.firebaseapp.com",
    databaseURL: "https://coppercrown-a18fd.firebaseio.com/",
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig)
)(createStore)

const store = createStoreWithFirebase(reducers, applyMiddleware(logger));

export default store; 