
import { CHANGE_CANVAS_DEFAULT_BACKGROUND } from './../actionTypes';


let initState = {
    canvasDefaultBackground: '#ececec',
}

export default function settingReducer(state = initState, action) {
    switch(action.type){
        case CHANGE_CANVAS_DEFAULT_BACKGROUND: {
            return {
                ...state
            }
        }
        default: {
            return state;
        }
    }
};
