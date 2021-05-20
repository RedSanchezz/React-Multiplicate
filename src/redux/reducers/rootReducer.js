
import { combineReducers } from 'redux';
import canvasReducer from './canvasReducer';
import brushReducer from './brushReducer';
import settingReducer from './settingReducer';
import layoutReducer from './layoutReducer';
import multiplicateReducer from './multiplicateReducer';

let rootReducer = combineReducers({
    canvas: canvasReducer,
    brush: brushReducer,
    setting: settingReducer,
    layouts: layoutReducer,
    multiplicate: multiplicateReducer
});
export default rootReducer;