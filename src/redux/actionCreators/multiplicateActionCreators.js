import { CHANGE_CURRENT_FRAME, CHANGE_FRAME_LIST } from "../actionTypes"

export function changeCurrentFrame(frame){
    return {
        type: CHANGE_CURRENT_FRAME,
        payload: frame
    }
}
export function changeFrameList(frameList){
    return {
        type: CHANGE_FRAME_LIST,
        payload: {
            frameList: frameList
        }
    }
}

