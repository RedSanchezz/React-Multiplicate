
import { CHANGE_BRUSH_SETTING, SAVE_BRUSH } from '../actionTypes';
import { CHANGE_SAVED_BRUSHES, CHANGE_ACTIVE_TOOL } from './../actionTypes';

export function changeBrushSetting(setting) {
    return {
        type: CHANGE_BRUSH_SETTING,
        payload: setting
    }
};

export function saveBrush(setting){
    return {
        type: SAVE_BRUSH,
        payload: setting
    }
}
export function changeSavedBrushes(savedBrushList){
    return {
        type: CHANGE_SAVED_BRUSHES,
        payload: savedBrushList
    }
}
