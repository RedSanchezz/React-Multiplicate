import { CHANGE_CANVAS_SIZE, SET_CANVAS, SET_CANVAS_BLOCK, SET_CURRENT_TOOL } from "../actionTypes";

export  function changeCanvasSize(width, height) {
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


export function setCurrentTool(currentTool) {
    return {
        type: SET_CURRENT_TOOL,
        payload: currentTool
    }
};

export function setCanvasBlock(canvasBlock){
    return {
        type: SET_CANVAS_BLOCK,
        payload: canvasBlock
    }
};