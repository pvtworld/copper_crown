import { createStore } from 'redux';
import reducers from './Reducers/combiner';

const store = createStore(reducers, {});

export default store; 