import { CHANGE_CANVAS_SIZE, SET_CANVAS, SET_CANVAS_BLOCK, SET_CANVAS_POSITION, SET_CANVAS_ZOOM, SET_CURRENT_TOOL } from "../actionTypes";

export function changeCanvasSize(width, height) {
    return {
        type: CHANGE_CANVAS_SIZE,
        payload: {
            width: width,
            height: height
        }
    }
};

export function setCanvas(canvas, context) {
    return {
        type: SET_CANVAS,
        payload: {canvas, context}
    }
};

export function setCurrentTool(currentTool, currentToolName) {
    return {
        type: SET_CURRENT_TOOL,
        payload: {currentTool, currentToolName}
    }
};

export function setCanvasBlock(canvasBlock){
    return {
        type: SET_CANVAS_BLOCK,
        payload: canvasBlock
    }
};

export function setCanvasPosition(position){
    return {
        type: SET_CANVAS_POSITION,
        payload: position
    }
}

export function setCanvasZoom(zoom){
    return {
        type: SET_CANVAS_ZOOM,
        payload: zoom
    }
}