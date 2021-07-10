

export default class SketchPointer extends Pointer{
    constructor(canvas, ctx){
        super(canvas, ctx);
    }
    create(){
    }

    destroy(){
        this._listenerManager.removeListener(this._canvas, "mousemove", this._pointerFunc);
        this._pointerElem.style.display = "none";
    }
    
    setColor(color){
        super.setColor(color);
        this._pointer.style.backgroundColor=color;;
    }
    setSize(x, y){
    }
}