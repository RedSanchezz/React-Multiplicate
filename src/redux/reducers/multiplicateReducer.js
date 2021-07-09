
import { CHANGE_FRAME_LIST, SET_MULTIPLICATE_CANVAS, STOP_PLAY, SET_CURRENT_FRAME, CAN_PLAY } from './../actionTypes';



let initState = {
    frameList: [],
    multiplicateCanvas: null,
    stopPlay: false,
    currentFrame: 0
}


export default function multiplicateReducer(state = initState, action) {
    switch(action.type){
        case CHANGE_FRAME_LIST: {
            return {
                ...state,
                frameList: action.payload.frameList.concat()
            }
        }
        case SET_MULTIPLICATE_CANVAS: {
            return {
                ...state,
                multiplicateCanvas: action.payload
            }
        }
        case STOP_PLAY: {
            return {
                ...state,
                stopPlay: true
            }
        }
        case CAN_PLAY: {
            return {
                ...state,
                stopPlay: false
            }
        }
        case SET_CURRENT_FRAME: {
            return {
                ...state,
                currentFrame: action.payload
            }
        }
        default : {
            return state;
        }
    }
};