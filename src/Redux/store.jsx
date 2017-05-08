import { createStore, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase'
import reducers from './Reducers/combiner';

const firebaseConfig = {
    apiKey: "AIzaSyBxf-SMmqau97RBu5y4f4a62OQBWLwevUM",
    authDomain: "coppercrown-a18fd.firebaseapp.com",
    databaseURL: "https://coppercrown-a18fd.firebaseio.com/",
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig)
)(createStore)

const store = createStoreWithFirebase(reducers);

export default store; 