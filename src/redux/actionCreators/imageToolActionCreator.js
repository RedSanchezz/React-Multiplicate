import {
    IMAGE_TOOL_ACCEPT_CHANGES, IMAGE_TOOL_CAN_START,
    IMAGE_TOOL_DRAG_BLOCK_DISABLE,
    IMAGE_TOOL_DRAG_BLOCK_ENABLE, IMAGE_TOOL_FINISH,
    IMAGE_TOOL_SET_FILE,
    IMAGE_TOOL_SET_POSITION
} from '../actionTypes';


export function enableDragBlock() {
    return {
        type: IMAGE_TOOL_DRAG_BLOCK_ENABLE
    }
}
export function disableDragBlock() {
    return {
        type: IMAGE_TOOL_DRAG_BLOCK_DISABLE
    }
}

export function setFile(file) {
    return {
        type: IMAGE_TOOL_SET_FILE,
        payload: file
    }
}
export function setPosition(position) {
    return {
        type: IMAGE_TOOL_SET_POSITION,
        payload: position
    }
}

export  function acceptChanges() {
    return {
        type: IMAGE_TOOL_ACCEPT_CHANGES
    }
}
export function finish() {
    return {
        type: IMAGE_TOOL_FINISH,
    }
}

export function canStart() {
    return {
        type: IMAGE_TOOL_CAN_START
    }
}