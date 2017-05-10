import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import { copperSearchReducer, displayRoofReducer, searchPosReducer } from './copperMapReducers';

const reducers = combineReducers({
    firebase: firebaseStateReducer,
    searchingForCopper: copperSearchReducer,
    displayRoofInfo: displayRoofReducer,
    searchPos: searchPosReducer
});

export default reducers;