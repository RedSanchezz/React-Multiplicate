export default class Pointer {
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._pointerElem=document.querySelector(".brush_pointer");
        this._pointer=null;
        this._listenerManager = new ListenerManager(new Array());
        this._pointerFunc=null;
    }
    setColor(){
    }
}