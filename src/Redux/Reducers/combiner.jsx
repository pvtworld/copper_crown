import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'

const reducers = combineReducers({
    firebase: firebaseStateReducer
})

export default reducers;