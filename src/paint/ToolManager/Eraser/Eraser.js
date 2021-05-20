import store from "../../../redux/store";
import LayoutManager from "../../LayoutManager/LayoutManager";
import Brush from "../Brush/Brush";

export default class Eraser extends Brush{
    constructor(canvas, ctx, canvasBlock){
        super(canvas, ctx);
        this._canvasBlock = canvasBlock;
    }
    create(){
        var ppts = [];

        const tmp_canvas = document.createElement("canvas");
        this._fakeCanvas =tmp_canvas;

        let state = store.getState();

        
        tmp_canvas.style.zIndex=100;

        tmp_canvas.height= state.canvas.size.height;
        tmp_canvas.width = state.canvas.size.width;
        tmp_canvas.style.top = state.canvas.position.top;
        tmp_canvas.style.left = state.canvas.position.left;
        tmp_canvas.style.position = 'absolute';
        //для удобства
        tmp_canvas.classList.add("tmp_canvas");
        
        const tmpCtx=tmp_canvas.getContext("2d");
        this._canvasBlock.prepend(tmp_canvas);



        this._listenerManager.addListener(tmp_canvas, "mousedown",(e) =>{

            let state = store.getState();

            this._ctx = state.layouts.currentLayout.getContext();
            this._canvas = state.layouts.currentLayout.getCanvas();


            this._ctx.lineWidth = state.brush.size;
            this._ctx.lineCap = 'round';

            tmpCtx.lineWidth = this._ctx.lineWidth;
            tmpCtx.lineCap  = this._ctx.lineCap;

            this._ctx.strokeStyle= state.setting.canvasDefaultBackground;
            tmpCtx.strokeStyle = state.setting.canvasDefaultBackground;
            onPaint(e);

            this._listenerManager.addListener(tmp_canvas, "mousemove", onPaint);
        });
        
        this._listenerManager.addListener(tmp_canvas, "mouseup", ()=> {
            this._listenerManager.removeListener(tmp_canvas, "mousemove",onPaint);

            let imageData=testFunc(tmpCtx.getImageData(0, 0, tmp_canvas.width, tmp_canvas.height), this._ctx.getImageData(0, 0, tmp_canvas.width, tmp_canvas.height));
            
            this._ctx.putImageData(imageData, 0, 0);

            LayoutManager.update();
            LayoutManager.renderCurrent();
            state.layouts.currentLayout.saveInHistory()

            tmpCtx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
            ppts=[];
        });

        var onPaint = (e)=> {
            let x= e.offsetX;
            let y = e.offsetY;
            ppts.push({x, y});

            tmpCtx.beginPath();
            tmpCtx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            if(ppts.length<=3){
                tmpCtx.arc(ppts[0].x, ppts[0].y, 0, 0, 2*Math.PI);
            }
            for (var i = 1; i < ppts.length - 2; i++) {
                var c = (ppts[i].x + ppts[i + 1].x) / 2;
                var d = (ppts[i].y + ppts[i + 1].y) / 2;
                tmpCtx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
            }
            
            tmpCtx.stroke();
        };
    }
    destroy(){
        this._listenerManager.removeAllListener();
        this._fakeCanvas.remove();
    }
}

//принимает 2 imageData 
function testFunc(tmpID, trueID){
    // 4 символа red green blue opacity
    for(let i=0;i<tmpID.data.length; i=i+4){
        if(tmpID.data[i+3]===255){
            trueID.data[i+3]=0;
        }
    }
    return trueID;
}
