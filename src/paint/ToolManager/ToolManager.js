
import { changeSavedBrushes, saveBrush } from "../../redux/actionCreators/brushActionCreators";
import { setCurrentTool } from "../../redux/actionCreators/canvasActionCreator";
import store from "../../redux/store";
import SketchBrush from "./Brush/SketchBrush";
import Eraser from "./Eraser/Eraser";


//класс для выбора инструмента рисования
export default class ToolManager{

    static setTool(tool){
        let state = store.getState();
        let currentTool = state.canvas.currentTool;
        if(currentTool) currentTool.destroy();
        switch(tool){
            case "SCETCH_BRUSH":{ 
                let brush = new SketchBrush();
                brush.create();
                store.dispatch(setCurrentTool(brush));
                break;
            }
            case "ERASER":{ 
                let brush = new Eraser();
                brush.create();
                store.dispatch(setCurrentTool(brush));
                break;
            }
            default: {
                let brush = new SketchBrush();
                brush.create();
                store.dispatch(setCurrentTool(brush));
                break;
            }
        }
    }

    static saveBrush(brush){
        store.dispatch(saveBrush(brush));
    }
    
    static changeSavedBrushes(savedBrushes){
        store.dispatch(changeSavedBrushes(savedBrushes))
    }
    
    static getTool(){
        return store.getState().canvas.currentTool;
    }
}

