import Tool from '../Tool';
import ListenerManager from '../../../utils/ListenerManager';
import store from '../../../redux/store';
import LayoutManager from '../../../Managers/LayoutManager/LayoutManager';

export default class Drag extends Tool{
    constructor() {
        super();
        this._listenerManager = new ListenerManager([]);
        this._rect = [];
        this._painted = false;
        this._currentLayout=null;
        this._canvas=null;
        this._ctx=null;

    }

    create() {
        let state = store.getState();
        this._currentLayout = state.layouts.currentLayout

        let canvas = this._currentLayout.getCanvas();
        this._canvas = canvas;

        let ctx = canvas.getContext('2d');
        this._ctx =ctx;

        let workSpace = state.canvas.canvasBlock;

        let tmpCanvas = document.createElement('canvas');
        let tmpCtx = tmpCanvas.getContext('2d');

        workSpace.append(tmpCanvas);
        this._tmpCanvas = tmpCanvas;
        this._getCanvasStyle(tmpCanvas);
        let startX=0;
        let startY=0;

        this._listenerManager.addListener(tmpCanvas, 'mousedown', (e)=> {
            startX = e.offsetX;
            startY= e.offsetY;

            let state = store.getState();
            this._currentLayout = state.layouts.currentLayout
            let canvas = this._currentLayout.getCanvas();
            this._canvas = canvas;
            let ctx = canvas.getContext('2d');
            this._ctx =ctx;


            //если квадрат еще не отрисован
            if(!this._painted) this._drawRectFunction(tmpCanvas, tmpCtx, startX, startY);
            else this._moveRectFunction(tmpCanvas, tmpCtx, startX, startY);
        });
    }

    _drawRectFunction(tmpCanvas, tmpCtx, startX, startY){
        this._listenerManager.addListener(tmpCanvas, 'mousemove', (e)=>{
            tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
            tmpCtx.strokeRect(startX, startY, e.offsetX-startX, e.offsetY-startY);
        });

        this._listenerManager.addListener(tmpCanvas, 'mouseup', (e)=>{
            this._rect=[startX, startY, e.offsetX, e.offsetY];
            if(startX > e.offsetX) {
                this._rect[0] = e.offsetX;
                this._rect[2] = startX;
            }
            if(startY>e.offsetY) {
                this._rect[1]=e.offsetY;
                this._rect[3] = startY;
            }

            console.log(this._rect);
            this._painted=true;
            this._listenerManager.removeListenersByEvent(tmpCanvas, 'mousemove');
            this._listenerManager.removeListenersByEvent(tmpCanvas, 'mouseup');

        })
    }


    _moveRectFunction(tmpCanvas, tmpCtx, x, y){
        //если мы кликнули внутрь выделенного квадрата
        if(this._rect.length!==null &&
            (x>this._rect[0] && x<this._rect[2])
            && (y>this._rect[1] && y<this._rect[3])){

            //получаем imageData настоящего слоя
            let imageData = this._ctx.getImageData(this._rect[0], this._rect[1], this._rect[2]-this._rect[0], this._rect[3]-this._rect[1]);

            let offsetX = x-this._rect[0];
            let offsetY = y-this._rect[1];

            console.log(offsetX);
            //двигаем ее на фейковом канвасе
            this._listenerManager.addListener(tmpCanvas, 'mousemove', (e)=>{
                console.log('move');
                tmpCtx.clearRect(0,0, tmpCanvas.width, tmpCanvas.height);
                tmpCtx.strokeRect(e.offsetX-offsetX, e.offsetY-offsetY, imageData.width, imageData.height);
                tmpCtx.putImageData(imageData, e.offsetX -offsetX, e.offsetY-offsetY);
            });

            //когда отпустили кнопку мыши - рисуем на настоящем холсте
            this._listenerManager.addListener(tmpCanvas, 'mouseup', (e)=>{

                //убираем рамку
                tmpCtx.clearRect(0,0, tmpCanvas.width, tmpCanvas.height);
                tmpCtx.putImageData(imageData,  e.offsetX -offsetX, e.offsetY-offsetY);

                //очищаем область из настоящего канваса
                this._ctx.clearRect(this._rect[0], this._rect[1], this._rect[2]-this._rect[0], this._rect[3]-this._rect[1]);
                //Рисуем картинку
                this._ctx.drawImage(tmpCanvas, 0, 0);

                //очищаем фейковый канвас
                tmpCtx.clearRect(0,0, tmpCanvas.width, tmpCanvas.height);

                this._painted =false;
                this._listenerManager.removeListenersByEvent(tmpCanvas,'mousemove');
                this._listenerManager.removeListenersByEvent(tmpCanvas,'mouseup');
                this._currentLayout.saveInHistory();
                LayoutManager.update();
            });
        }
        //отпустили кнопку мыши не на выделенной части
        else {
            this._painted=false;
            tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
        }

    }

    destroy() {
        this._listenerManager.removeAllListener();
        this._tmpCanvas.remove();
    }
    _getCanvasStyle(tmpCanvas){
        let state = store.getState();
        tmpCanvas.style.zIndex = 100;
        tmpCanvas.height = state.canvas.size.height;
        tmpCanvas.width = state.canvas.size.width;
        tmpCanvas.style.top = state.canvas.position.top;
        tmpCanvas.style.left = state.canvas.position.left;
        tmpCanvas.style.position = 'absolute';
        tmpCanvas.style.transform = `scale(${state.canvas.zoom})`;
        //для удобства
        tmpCanvas.classList.add('tmpCanvas');
    }
}