import SketchBrush from '../../models/Tool/Brush/SketchBrush';
import Eraser from '../../models/Tool/Eraser/Eraser';
import Hand from '../../models/Tool/Hand/Hand';
import {changeSavedBrushes, saveBrush} from '../../redux/actionCreators/brushActionCreators';
import {setCurrentTool} from '../../redux/actionCreators/canvasActionCreator';
import store from '../../redux/store';
import Drag from '../../models/Tool/Drag/Drag';
import ImageTool from '../../models/Tool/ImageTool/ImageTool';


//класс для работы с инструментами
export default class ToolManager {

    static setTool(toolName) {
        console.log('wtf SET TOOL' + toolName);
        let state = store.getState();
        let currentTool = state.canvas.currentTool;
        if (currentTool) currentTool.destroy();

        switch (toolName) {
            case 'SCETCH_BRUSH': {
                let brush = new SketchBrush();
                brush.create();
                store.dispatch(setCurrentTool(brush, 'SCETCH_BRUSH'));
                break;
            }
            case 'ERASER': {
                let brush = new Eraser();
                brush.create();
                store.dispatch(setCurrentTool(brush, 'ERASER'));
                break;
            }
            case 'HAND': {
                let brush = new Hand();
                brush.create();
                store.dispatch(setCurrentTool(brush, 'HAND'));
                break;
            }
            case 'DRAG': {
                let brush = new Drag();
                brush.create();
                store.dispatch(setCurrentTool(brush, 'DRAG'));
                break;
            }
            case 'IMAGE': {
                let brush = new ImageTool();
                brush.create();
                store.dispatch(setCurrentTool(brush, 'IMAGE'));
                break;
            }
            default: {
                let brush = new SketchBrush();
                brush.create();
                store.dispatch(setCurrentTool(brush, 'SCETCH_BRUSH'));
                break;
            }
        }

    }

    static saveBrush(brush) {
        store.dispatch(saveBrush(brush));
    }

    static changeSavedBrushes(savedBrushes) {
        store.dispatch(changeSavedBrushes(savedBrushes));
    }

    static getTool() {
        return store.getState().canvas.currentTool;
    }
}

