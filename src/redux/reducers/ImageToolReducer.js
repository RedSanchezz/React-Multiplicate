import {
    IMAGE_TOOL_ACCEPT_CHANGES,
    IMAGE_TOOL_DRAG_BLOCK_DISABLE,
    IMAGE_TOOL_DRAG_BLOCK_ENABLE, IMAGE_TOOL_FINISH,
    IMAGE_TOOL_SET_FILE,
    IMAGE_TOOL_SET_POSITION
} from '../actionTypes';


let initState = {
    file: null,
    dragBlockEnabled: true,
    position: {
        x: 0,
        y:0,
        width: 100,
        height: 100,
        changed: false
    },
    finish: false,
};

export default function ImageToolReducer(state = initState, action) {
    switch (action.type) {
        case IMAGE_TOOL_SET_FILE: {
            return {
                ...state,
                file: action.payload
            }
        }
        case IMAGE_TOOL_DRAG_BLOCK_DISABLE: {
            return {
                ...state,
                dragBlockEnabled: false
            }
        }
        case IMAGE_TOOL_DRAG_BLOCK_ENABLE: {
            return {
                ...state,
                dragBlockEnabled: true
            }
        }
        case IMAGE_TOOL_SET_POSITION: {
            return  {
                ...state,
                position: {
                    ...action.payload,
                    changed: true,
                }
            }
        }
        case IMAGE_TOOL_ACCEPT_CHANGES: {
            return {
                ...state,
                position: {
                    ...state.position,
                    changed: false
                }
            }
        }
        case IMAGE_TOOL_FINISH: {
            return {
                ...state,
                finish: !state.finish
            }
        }
        default : {
            return {...state};
        }
    }
}