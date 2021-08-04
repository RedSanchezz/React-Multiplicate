import {combineReducers} from 'redux';
import canvasReducer from './canvasReducer';
import brushReducer from './brushReducer';
import settingReducer from './settingReducer';
import layoutReducer from './layoutReducer';
import frameReducer from './frameReducer';
import ImageToolReducer from './ImageToolReducer';



let rootReducer = combineReducers({
    canvas: canvasReducer,
    brush: brushReducer,
    setting: settingReducer,
    layouts: layoutReducer,
    frames: frameReducer,
    imageTool: ImageToolReducer
});
export default rootReducer;