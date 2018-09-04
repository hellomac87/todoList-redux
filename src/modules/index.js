import input from './input';
import todo from './todo';
import { combineReducers } from 'redux';

export default combineReducers({
    input,
    todo
});