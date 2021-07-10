import Brush from "./Brush";


export default class SketchBrush extends Brush{
    constructor(canvas, ctx){
        super(canvas, ctx);
    }
    create(){
        let ctx = this._ctx;
        let end=false;

        this._listenerManager.addListener(this._canvas, "mousedown", (e)=>{
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.closePath();
            let x = e.offsetX;
            let y= e.offsetY;
            end=false;
            this._listenerManager.addListener(this._canvas, "mousemove", (e) => {
                drawLine(this._ctx, x, y, e.offsetX , e.offsetY);
                x=e.offsetX;
                y=e.offsetY;
                
            });
        });

        this._listenerManager.addListener(document.body, "mouseup", (e)=>{
            if(!end){
                this._listenerManager.removeListenersByEvent(this._canvas, "mousemove");
                end=true;
            }
        });

        this._listenerManager.addListener(document.body, "mouseleave", (e)=>{
            if(!end){
                this._listenerManager.removeListenersByEvent(this._canvas, "mousemove");
                end=true;
            }
        });
    }
    addPointer(){
    }
}