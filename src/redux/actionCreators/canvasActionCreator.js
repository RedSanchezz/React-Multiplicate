import { CHANGE_CANVAS_SIZE, SET_CANVAS, SET_TOOL_MANAGER } from "../actionTypes";

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


export default function setToolManager(toolManager) {
    return {
        type: SET_TOOL_MANAGER,
        payload: toolManager
    }
};
