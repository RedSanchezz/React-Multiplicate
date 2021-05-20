import { CHANGE_LAYOUT_LIST } from "../actionTypes";
import { CHANGE_CURRENT_LAYOUT } from './../actionTypes';

let initState = {
    layoutList: [],
    currentLayout: null,
    currentLayoutIndex: 0,
}

export default function layoutReducer(state = initState, action) {
    switch(action.type){
        case CHANGE_LAYOUT_LIST: {
            return {
                ...state,
                layoutList: Array.from(action.payload)
            }
        }
        case CHANGE_CURRENT_LAYOUT: {
            return {
                ...state,
                currentLayout: action.payload.currentLayout,
                currentLayoutIndex: action.payload.currentLayoutIndex
            }
        }
        default: {
            return state;
        }
    }
};
