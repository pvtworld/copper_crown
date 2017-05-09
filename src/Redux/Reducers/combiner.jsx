import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import { copperSearchReducer, displayRoofReducer } from './copperMapReducers';

const reducers = combineReducers({
    firebase: firebaseStateReducer,
    searchingForCopper: copperSearchReducer,
    displayRoofInfo: displayRoofReducer
});

export default reducers;