import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import { copperSearchReducer, displayRoofReducer, searchPosReducer } from './copperMapReducers';

const reducers = combineReducers({
    firebase: firebaseStateReducer,
    copperSearch: copperSearchReducer,
    copperRoof: displayRoofReducer,
    searchPos: searchPosReducer
});

export default reducers;