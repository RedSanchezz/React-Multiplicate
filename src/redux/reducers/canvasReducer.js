import {
    CHANGE_CANVAS_SIZE,
    SET_CANVAS,
    SET_CANVAS_BLOCK,
    SET_CANVAS_POSITION,
    SET_CANVAS_ZOOM,
    SET_CURRENT_TOOL
} from './../actionTypes';


let initState = {
    canvas: null,
    canvasBlock: null,
    context: null,
    size: {
        width: '100px',
        height: '100px'
    },
    position: {
        top: '1px',
        left: '1px'
    },
    currentTool: null,
    currentToolName: '',
    zoom: 1

};

export default function canvasReducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_CANVAS_SIZE: {
            return {
                ...state,
                size: {
                    width: action.payload.width,
                    height: action.payload.height
                }
            };
        }

        case SET_CANVAS: {
            return {
                ...state,
                canvas: action.payload.canvas,
                context: action.payload.context
            };
        }

        case SET_CURRENT_TOOL: {
            return {
                ...state,
                currentTool: action.payload.currentTool,
                currentToolName: action.payload.currentToolName

            };
        }
        case SET_CANVAS_BLOCK: {
            return {
                ...state,
                canvasBlock: action.payload
            };
        }

        case SET_CANVAS_POSITION: {
            return {
                ...state,
                position: action.payload
            };
        }
        case SET_CANVAS_ZOOM: {
            return {
                ...state,
                zoom: action.payload
            };
        }

        default: {
            return state;
        }
    }
};
