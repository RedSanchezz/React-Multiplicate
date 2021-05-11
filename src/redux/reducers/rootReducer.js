
import { combineReducers } from 'redux';
import canvasReducer from './canvasReducer';
import brushReducer from './brushReducer';
import settingReducer from './settingReducer';
import layoutReducer from './layoutReducer';

let rootReducer = combineReducers({
    canvas: canvasReducer,
    brush: brushReducer,
    setting: settingReducer,
    layouts: layoutReducer
});

export default rootReducer;