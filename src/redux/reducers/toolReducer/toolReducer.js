import {combineReducers} from 'redux';
import brushReducer from './brush/brushReducer';
import imageToolReducer from './image/ImageToolReducer';
import eraserReducer from './eraser/eraserReducer';


const toolReducer = combineReducers({
        brush: brushReducer,
        image: imageToolReducer,
        eraser: eraserReducer
});

export default toolReducer;