import { combineReducers } from 'redux';
import blogReducer from '../blog/reducer';
import notifyReducer from '../notify/reducer';
import authReducer from '../auth/reducer';

export default combineReducers({
    blogs: blogReducer,
    notify: notifyReducer,
    auth: authReducer
}) 