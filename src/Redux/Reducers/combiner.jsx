import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import { showModalReducer } from './navigationReducers';
import { copperSearchReducer, displayRoofReducer, loginReducer, copperPriceReducer} from './copperMapReducers';

const reducers = combineReducers({
    login: loginReducer,
    firebase: firebaseStateReducer,
    copperSearch: copperSearchReducer,
    copperRoof: displayRoofReducer,
    showModal: showModalReducer,
    copperPrice: copperPriceReducer
});

export default reducers;