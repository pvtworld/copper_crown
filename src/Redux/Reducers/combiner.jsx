import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { showModalReducer } from './navigationReducers';
import { deadlineClockReducer } from './clockReducer';
import { copperSearchReducer, displayRoofReducer, loginReducer, copperPriceReducer, updatePriceMultiplierReducer} from './copperMapReducers';
import { showUserModalReducer } from './userReducers';

const reducers = combineReducers({
    login: loginReducer,
    firebase: firebaseStateReducer,
    copperSearch: copperSearchReducer,
    copperRoof: displayRoofReducer,
    showModal: showModalReducer,
    copperPrice: copperPriceReducer,
    deadlineClock: deadlineClockReducer,
    copperMultiplier: updatePriceMultiplierReducer,
    showNewUserModal: showUserModalReducer
});

export default reducers;
