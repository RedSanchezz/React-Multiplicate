import {CHANGE_ERASER_SETTING} from '../actionTypes';


export function changeEraserSetting(size){
    return {
        type: CHANGE_ERASER_SETTING,
        payload: {
            size
        }
    }
}