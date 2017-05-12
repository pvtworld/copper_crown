import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import { copperSearchReducer, displayRoofReducer, loginReducer} from './copperMapReducers';
import { showModalReducer } from './navigationReducers';

const reducers = combineReducers({
    login: loginReducer,
    firebase: firebaseStateReducer,
    copperSearch: copperSearchReducer,
    copperRoof: displayRoofReducer,
    showModal: showModalReducer
});

export default reducers;