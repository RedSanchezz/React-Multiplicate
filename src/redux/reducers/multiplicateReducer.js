import {CAN_PLAY, CHANGE_FRAME_LIST, SET_CURRENT_FRAME, SET_MULTIPLICATE_CANVAS, STOP_PLAY} from './../actionTypes';


let initState = {
    frameList: [],
    multiplicateCanvas: null,
    stopPlay: true,
    currentFrameIndex: 0
};


export default function multiplicateReducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_FRAME_LIST: {
            return {
                ...state,
                frameList: action.payload.frameList.concat()
            };
        }
        case SET_MULTIPLICATE_CANVAS: {
            return {
                ...state,
                multiplicateCanvas: action.payload
            };
        }
        case STOP_PLAY: {
            return {
                ...state,
                stopPlay: true,
            };
        }
        case CAN_PLAY: {
            return {
                ...state,
                stopPlay: false,
            };
        }
        case SET_CURRENT_FRAME: {
            return {
                ...state,
                currentFrameIndex: action.payload
            };
        }
        default : {
            return state;
        }
    }
};