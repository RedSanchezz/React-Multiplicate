
import store from "../../../redux/store";
import LayoutManager from "../../LayoutManager/LayoutManager";
import Brush from "./Brush";


export default class SketchBrush extends Brush{
    constructor(){
        super();
        this.started = false;
        let state = store.getState();
        this._canvasBlock = state.canvas.canvasBlock;
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
        
        const tmp_ctx=tmp_canvas.getContext("2d");
        this._canvasBlock.prepend(tmp_canvas);

        //Нажимаем на клавишу мыши
        this._listenerManager.addListener(this._canvasBlock, "mousedown",(e) =>{
        
            let state = store.getState();
            if(state.layouts.currentLayout.isHidden()){
                alert('Выбранный вами слой скрыт !');
                return;
            }
            this.started = true;

            this._ctx = state.layouts.currentLayout.getContext();
            this._canvas = state.layouts.currentLayout.getCanvas();
            
            this._ctx.strokeStyle = state.brush.color;
            this._ctx.lineWidth = state.brush.size;
            this._ctx.lineCap = 'round';

            tmp_ctx.strokeStyle = this._ctx.strokeStyle;
            tmp_ctx.lineWidth = this._ctx.lineWidth;
            tmp_ctx.lineCap  = this._ctx.lineCap;

            onPaint(e);
            this._listenerManager.addListener(tmp_canvas, "mousemove", onPaint);
        });
        
        //когда отжимаем клавишу мыши
        this._listenerManager.addListener(this._canvasBlock, "mouseup", ()=> {
            if(this.started){
                this.started = false;

                this._listenerManager.removeListener(tmp_canvas, "mousemove", onPaint);
                this._ctx.drawImage(tmp_canvas, 0, 0);

                let state = store.getState();
                LayoutManager.update();
                LayoutManager.renderCurrent();
                state.layouts.currentLayout.saveInHistory();
                
                tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

                ppts=[];
            }

        });

        //когда мышка уходит с холста
        this._listenerManager.addListener(this._canvasBlock, "mouseleave", ()=> {
            if(this.started){
                this.started = false;

                this._listenerManager.removeListener(tmp_canvas, "mousemove", onPaint);
                this._ctx.drawImage(tmp_canvas, 0, 0);

                let state = store.getState();
                LayoutManager.update();
                LayoutManager.renderCurrent();
                state.layouts.currentLayout.saveInHistory();
                
                tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

                ppts=[];
            }
        });

        var onPaint = (e)=> {
            let x= e.offsetX;
            let y = e.offsetY;
            ppts.push({x, y});

            tmp_ctx.beginPath();
            // tmp_ctx.moveTo(ppts[0].x, ppts[0].y);
            tmp_ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            if(ppts.length<=3){
                tmp_ctx.arc(ppts[0].x, ppts[0].y, 0, 0, 2*Math.PI);
            }
            for (var i = 1; i < ppts.length - 2; i++) {
                var c = (ppts[i].x + ppts[i + 1].x) / 2;
                var d = (ppts[i].y + ppts[i + 1].y) / 2;
                tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
            }
            tmp_ctx.stroke();
        };

        
    }

    destroy(){
        this._listenerManager.removeAllListener();
        this._fakeCanvas.remove();
    }
}