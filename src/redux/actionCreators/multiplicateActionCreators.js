import {CAN_PLAY, CHANGE_FRAME_LIST, SET_MULTIPLICATE_CANVAS, STOP_PLAY} from '../actionTypes';
import {SET_CURRENT_FRAME} from './../actionTypes';


export function changeFrameList(frameList) {
    return {
        type: CHANGE_FRAME_LIST,
        payload: {
            frameList: frameList
        }
    };
}

export function setMultiplicateCanvas(canvas) {
    return {
        type: SET_MULTIPLICATE_CANVAS,
        payload: {
            canvas: canvas,
            context: canvas.getContext('2d')
        }
    };
}

export function stopPlay() {
    return {
        type: STOP_PLAY
    };
}

export function canPlay() {
    return {
        type: CAN_PLAY
    };
}

export function setcurrentFrameIndex(index) {
    return {
        type: SET_CURRENT_FRAME,
        payload: index
    };
}