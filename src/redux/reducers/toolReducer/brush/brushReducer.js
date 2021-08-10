import {CHANGE_BRUSH_SETTING, SAVE_BRUSH} from '../../../actionTypes';
import {CHANGE_SAVED_BRUSHES} from '../../../actionTypes';


let initState = {
    color: '#ff0f00',
    size: '20',
    alpha: 1,
    savedBrushes: []
};

export default function brushReducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_BRUSH_SETTING: {
            return {
                ...state,
                ...action.payload
            };
        }
        case SAVE_BRUSH: {
            return {
                ...state,
                savedBrushes: state.savedBrushes.concat(action.payload)
            };
        }
        case CHANGE_SAVED_BRUSHES: {
            return {
                ...state,
                savedBrushes: Array.from(action.payload)
            };
        }
        default: {
            return state;
        }
    }
};
