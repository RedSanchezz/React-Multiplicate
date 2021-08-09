import store from '../../redux/store';

export default class Tool {
    constructor() {
    }

    create() {
    }

    destroy() {
    }

    setLayout(canvas, ctx) {
        this._canvas = canvas;
        this._ctx = ctx;
    }
    _setCanvasStyle(tmpCanvas){
        let state = store.getState();
        tmpCanvas.style.zIndex = 75;
        tmpCanvas.height = state.canvas.size.height;
        tmpCanvas.width = state.canvas.size.width;
        tmpCanvas.style.top = state.canvas.position.top;
        tmpCanvas.style.left = state.canvas.position.left;
        tmpCanvas.style.position = 'absolute';
        tmpCanvas.style.transform = `scale(${state.canvas.zoom})`;
        //для удобства
        tmpCanvas.classList.add('tmpCanvas');
    }
    _init (){
        let state = store.getState();
        this._currentLayout = state.layouts.currentLayout;
        let canvas = this._currentLayout.getCanvas();
        this._canvas = canvas;
        let ctx = canvas.getContext('2d');
        this._ctx =ctx;

        let workSpace = state.canvas.canvasBlock;
        this._workspace = workSpace;

        let tmpCanvas = document.createElement('canvas');
        this._tmpCanvas = tmpCanvas;
        this._setCanvasStyle(tmpCanvas);
        this._workspace.append(tmpCanvas);
        this._tmpCtx = tmpCanvas.getContext('2d');
    }
}