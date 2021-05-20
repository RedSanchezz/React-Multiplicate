
import { CHANGE_FRAME_LIST } from './../actionTypes';
let initState = {
    frameList: [],
    currentFrame: {
        current:null,
    }
}

let frame = {
    delay: 100,
    canvas: 'canvas'
}

export default function multiplicateReducer(state = initState, action) {
    switch(action.type){
        case CHANGE_FRAME_LIST: {
            return {
                ...state,
                frameList: action.payload.frameList.concat()
            }
        }
        default : {
            return state;

        }
    }
};