
import SketchBrush from "./Brush/SketchBrush";
import Eraser from "./Eraser/Eraser";


//класс для выбора инструмента рисования

export default class ToolManager{
    constructor(canvas, ctx, canvasBlock){
        this._canvas = canvas;
        this._ctx = ctx;
        this._currentTool = null;
        this._canvasBlock= canvasBlock;
    }
    setTool(tool){
        if(this._currentTool) this._currentTool.destroy();
        switch(tool){
            case "SCETCH_BRUSH":{ 
                let brush = new SketchBrush(this._canvas, this._ctx, this._canvasBlock);
                brush.create();
                this._currentTool=brush;
                break;
            }
            case "ERASER":{ 
                let brush = new Eraser(this._canvas, this._ctx, this._canvasBlock);
                brush.create();
                this._currentTool=brush;
                break;
            }
            
            default: {
                let brush = new SketchBrush(this._canvas, this._ctx, this._canvasBlock);
                brush.create();
                this._currentTool=brush;
                break;
            }
        }
    }
    getTool(){
        return this._currentTool;
    }
}

