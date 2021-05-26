
import { CHANGE_FRAME_LIST, SET_MULTIPLICATE_CANVAS, STOP_PLAY, PLAY, SET_CURRENT_FRAME } from './../actionTypes';



let initState = {
    frameList: [],
    multiplicateCanvas: null,
    isPlaying: false,
    canPlay: true,
    currentFrame: 0
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
        case SET_MULTIPLICATE_CANVAS: {
            return {
                ...state,
                multiplicateCanvas: action.payload
            }
        }
        case STOP_PLAY: {
            console.log('stop play');
            return {
                ...state,
                isPlaying: false
            }
        }
        case PLAY: {
            return {
                ...state,
                isPlaying: true
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