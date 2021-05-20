import { CHANGE_CANVAS_SIZE, SET_CANVAS, SET_CURRENT_TOOL, SET_TOOL_MANAGER, SET_CANVAS_BLOCK } from './../actionTypes';


let initState = {
    canvas: null,
    canvasBlock:null,
    context: null,
    size:{
        width: '100px',
        height: '100px'
    },
    position: {
        top: '1px',
        left: '1px'
    },
    currentTool: null,
}

export default function canvasReducer(state = initState, action) {
    switch(action.type){
        case CHANGE_CANVAS_SIZE: {
            return {
                ...state,
                size: {
                    width: action.payload.width,
                    height: action.payload.height,
                }
            };
        }

        case SET_CANVAS: {
            return {
                ...state,
                canvas: action.payload.canvas,
                context: action.payload.context
            }
        }

        case SET_CURRENT_TOOL: {
            return {
                ...state,
                currentTool : action.payload
            }
        }
        case SET_CANVAS_BLOCK: {
            return {
                ...state,
                canvasBlock: action.payload
            }
        }

        default: {
            return state;
        }
    }
};
