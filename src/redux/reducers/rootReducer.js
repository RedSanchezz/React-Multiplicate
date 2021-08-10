import {combineReducers} from 'redux';
import canvasReducer from './canvasReducer/canvasReducer';
import settingReducer from './settingReducer/settingReducer';
import layoutReducer from './layoutReducer/layoutReducer';
import frameReducer from './frameReducer/frameReducer';
import toolReducer from './toolReducer/toolReducer';



let rootReducer = combineReducers({
    canvas: canvasReducer,
    tool: toolReducer,
    setting: settingReducer,
    layouts: layoutReducer,
    frames: frameReducer,

});
export default rootReducer;