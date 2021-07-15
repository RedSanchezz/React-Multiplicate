import {CHANGE_LAYOUT_LIST} from '../actionTypes';
import {CHANGE_CURRENT_LAYOUT} from './../actionTypes';

export function changeLayoutList(layoutList) {
    return {
        type: CHANGE_LAYOUT_LIST,
        payload: layoutList
    };
}

export function changeCurrentLayout(currentLayout, index) {
    return {
        type: CHANGE_CURRENT_LAYOUT,
        payload: {
            currentLayout: currentLayout,
            currentLayoutIndex: index
        }
    };
}

