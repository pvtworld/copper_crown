import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
import user from './userReducer';

const reducers = combineReducers({
    user,
    firebase: firebaseStateReducer
})

export default reducers;