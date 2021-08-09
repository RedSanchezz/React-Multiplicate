import Tool from '../Tool';
import ListenerManager from '../../../utils/ListenerManager';
import store from '../../../redux/store';
import LayoutManager from '../../../Managers/LayoutManager/LayoutManager';

export default class Drag extends Tool{
    constructor() {
        super();
        this._listenerManager = new ListenerManager([]);
        //выделенная область
        this._rect = [];
        //закончили ли мы задавать выделенную область
        this._painted = false;
        //выбраный слой
        this._currentLayout=null;
        //холст выбранного слоя
        this._canvas=null;
        this._ctx=null;
        //вырезанный из холста прямоугольник
        this._selectedAreaImageData = null;
        //холст без вырезанного прямоугольника
        this._canvasWithoutSelectedArea= null;
    }

    create() {
        this._init();

        let tmpCanvas=this._tmpCanvas;
        let tmpCtx=this._tmpCtx;

        let startX=0;
        let startY=0;
        //следим за изменением активного слоя
        this._unsubscribe = store.subscribe(()=>{
            let state = store.getState();
            //если изменился активный слой -  все обнуляем
            if(this._currentLayout!==state.layouts.currentLayout){
                this._rect = [];
                this._currentLayout=state.layouts.currentLayout;
                this._selectedAreaImageData = null;
                this._canvasWithoutSelectedArea= null;
                this._painted=false;
                tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
            }
        });


        this._listenerManager.addListener(tmpCanvas, 'mousedown', (e)=> {
            startX = e.offsetX;
            startY= e.offsetY;
            if(!this._painted) this._selectArea(tmpCanvas, tmpCtx, startX, startY);
            else this._moveRectFunction(tmpCanvas, tmpCtx, startX, startY);
        });
    }
    //выбираем область для перемещения
    _selectArea(tmpCanvas, tmpCtx, startX, startY){
        //просто клик ?
        //было ли выделение области
        let resized = false;

        this._listenerManager.addListener(tmpCanvas, 'mousemove', (e)=>{
            tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
            tmpCtx.strokeRect(startX, startY, e.offsetX-startX, e.offsetY-startY);
            resized = true;
        });

        this._listenerManager.addListener(tmpCanvas, 'mouseup', (e)=>{
            this._rect=[startX, startY, e.offsetX, e.offsetY];
            //выстраиваем координаты по возрастанию
            if(startX > e.offsetX) {
                this._rect[0] = e.offsetX;
                this._rect[2] = startX;
            }
            if(startY>e.offsetY) {
                this._rect[1]=e.offsetY;
                this._rect[3] = startY;
            }

            //не равна ли длинна/ширина 0
            let notNullSize = (this._rect[2]-this._rect[0]!=0)&&(this._rect[3]-this._rect[1]!=0);

            //если меняли размер и площадь не равна 0, то заканчиваем выделение
            this._painted= resized && notNullSize ? true : false;

            //когда закончили рисовать прямоугольник
            if(this._painted) {
                //создаем canvas, с вырезанной выделенной областью
                let canvas = document.createElement('canvas');
                canvas.width = this._canvas.width;
                canvas.height = this._canvas.height;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(this._canvas, 0, 0);
                ctx.clearRect(this._rect[0], this._rect[1], this._rect[2] - this._rect[0], this._rect[3] - this._rect[1]);

                this._canvasWithoutSelectedArea = canvas;
                //сохраняем перетаскиваемый кусок
                this._selectedAreaImageData = this._ctx.getImageData(this._rect[0], this._rect[1], this._rect[2] - this._rect[0], this._rect[3] - this._rect[1]);

            }
            this._listenerManager.removeListenersByEvent(tmpCanvas, 'mousemove');
            this._listenerManager.removeListenersByEvent(tmpCanvas, 'mouseup');

        })
    }

    _moveRectFunction(tmpCanvas, tmpCtx, x, y){
        //если мы кликнули внутрь выделенного квадрата
        if(this._rect.length!==0 &&
            (x>this._rect[0] && x<this._rect[2])
            && (y>this._rect[1] && y<this._rect[3])){
            //получаем imageData перетаскиваемого куска
            let selectedAreaID=this._selectedAreaImageData;
                // this._ctx.getImageData(this._rect[0], this._rect[1], this._rect[2]-this._rect[0], this._rect[3]-this._rect[1]);

            //вычисляем смещение относительно того места куда кликнули
            let offsetX = x-this._rect[0];
            let offsetY = y-this._rect[1];


            //при перемещении мыши двигаем на ложном холсте вырезанную область
            this._listenerManager.addListener(tmpCanvas, 'mousemove', (e)=>{
                tmpCtx.clearRect(0,0, tmpCanvas.width, tmpCanvas.height);
                tmpCtx.strokeRect(e.offsetX-offsetX, e.offsetY-offsetY, selectedAreaID.width, selectedAreaID.height);
                tmpCtx.putImageData(selectedAreaID, e.offsetX -offsetX, e.offsetY-offsetY);
            });
            //когда отпустили кнопку мыши - перерисовываем на настоящий холст
            this._listenerManager.addListener(tmpCanvas, 'mouseup', (e)=>{
                //убираем рамку
                tmpCtx.clearRect(0,0, tmpCanvas.width, tmpCanvas.height);
                tmpCtx.putImageData(selectedAreaID, e.offsetX -offsetX, e.offsetY-offsetY);

                //рисуем холст без выделенной области
                this._ctx.clearRect( 0, 0, this._canvas.width, this._canvas.height);
                this._ctx.drawImage(this._canvasWithoutSelectedArea, 0, 0);

                //перерисовываем с ложного холста на настоящий
                this._ctx.drawImage(this._tmpCanvas,0,0);

                //добавляем рамку
                tmpCtx.strokeRect(e.offsetX-offsetX, e.offsetY-offsetY, selectedAreaID.width, selectedAreaID.height);

                //обновляем координаты для отлова клика
                this._rect=[e.offsetX -offsetX, e.offsetY-offsetY, e.offsetX -offsetX+selectedAreaID.width,  e.offsetY-offsetY + selectedAreaID.height];

                this._listenerManager.removeListenersByEvent(tmpCanvas,'mousemove');
                this._listenerManager.removeListenersByEvent(tmpCanvas,'mouseup');

                //сохраняем в историю
                this._currentLayout.saveInHistory();
                LayoutManager.update();
            });
        }
        //отпустили кнопку мыши не на выделенной части
        else {
            //очищаем ложный холст и переходим в режим выделения области
            this._painted=false;
            tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
        }

    }

    destroy() {
        this._listenerManager.removeAllListener();
        this._tmpCanvas.remove();
        this._unsubscribe();
    }

}