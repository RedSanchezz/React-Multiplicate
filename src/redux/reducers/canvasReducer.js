import { CHANGE_CANVAS_SIZE, SET_CANVAS, SET_TOOL_MANAGER } from './../actionTypes';


let initState = {
    canvas: null,
    context: null,
    size:{
        width: '100px',
        height: '100px'
    },
    position: {
        top: '1px',
        left: '1px'
    },
    toolManager: null
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
        case SET_TOOL_MANAGER: {
            return {
                ...state,
                toolManager: action.payload
            }
        }
        default: {
            return state;
        }
    }
};
