import {CHANGE_ERASER_SETTING} from '../../../actionTypes';


let initState = {
    size: '20',
    alpha: 1
};

 function eraserReducer(state = initState, action){
    switch (action.type) {
        case CHANGE_ERASER_SETTING: {
            return {
                ...state,
                ...action.payload
            };
        }
        default: {
            return {...state}
        }
    }
}
export default eraserReducer;