// slices/index.js
import { combineReducers } from 'redux';
import authReducer from "./authslice"
const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
