import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import { copperSearchReducer, displayRoofReducer, loginReducer} from './copperMapReducers';

const reducers = combineReducers({
    login: loginReducer,
    firebase: firebaseStateReducer,
    copperSearch: copperSearchReducer,
    copperRoof: displayRoofReducer,
});

export default reducers;