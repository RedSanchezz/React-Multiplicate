import Tool from '../Tool';
import ListenerManager from '../../../utils/ListenerManager';
import store from '../../../redux/store';
import LayoutManager from '../../../Managers/LayoutManager/LayoutManager';
import {
    acceptChanges, canStart,
    disableDragBlock,
    enableDragBlock, finish,
    imageToolSetFile, imageToolSetPosition
} from '../../../redux/actionCreators/imageToolActionCreator';

export default class ImageTool extends Tool{
    constructor() {
        super();
        this._listenerManager = new ListenerManager([]);
        this._tempCanvasListenerManager = new ListenerManager([]);

        this._rect = [];
        this._painted = false;
        this._dragBlock = null;
        this._unsubscribe = null;
        this._workspace = null;
        this._tmpCanvas = null;
        this._tmpCtx = null;
    }
    create() {
        let state = store.getState();

        this._currentLayout = state.layouts.currentLayout;
        let canvas = this._currentLayout.getCanvas();
        this._canvas = canvas;
        let ctx = canvas.getContext('2d');
        this._ctx =ctx;

        let workSpace = state.canvas.canvasBlock;
        this._workspace = workSpace;
        console.log('imageTool');

        let tmpCanvas = document.createElement('canvas');
        this._tmpCanvas = tmpCanvas;
        this._setCanvasStyle(tmpCanvas);
        this._workspace.append(tmpCanvas);
        this._tmpCtx = tmpCanvas.getContext('2d');

        this._unsubscribe =store.subscribe(()=>{
            let state = store.getState();
            //если установлен файл, и блок для перетаскивания активен
            if(!!state.imageTool.file && state.imageTool.dragBlockEnabled) {
                this._dragBlock.remove();
                store.dispatch(disableDragBlock());
                this._initTmpCanvas();
            }
            //если файл не установлен и блок для перетаскивания не активен
            if(!state.imageTool.file && !state.imageTool.dragBlockEnabled) {
                this._workspace.append(this._dragBlock);
                this._tempCanvasListenerManager.removeAllListener();

                store.dispatch(enableDragBlock());
            }

            //если изменили позицию картинки
            if(state.imageTool.position.changed) {
                let img = state.imageTool.file;
                this._img = img;
                let position = state.imageTool.position;
                //перерисовываем
                this._tmpCtx.clearRect(0,0, this._tmpCanvas.width, this._tmpCanvas.height);

                this._tmpCtx.drawImage(img, position.x, position.y, position.width, position.height);

                this._rect= [position.x, position.y,position.x+ +position.width, position.y + +position.height];

                store.dispatch(acceptChanges());
            }
            // если закончили работать с изображением
            if(state.imageTool.finish){
                let ctx = state.layouts.currentLayout.getContext();
                //переносим на настоящий холст
                ctx.drawImage(this._tmpCanvas,0,0);
                this._tmpCtx.clearRect(0,0, this._tmpCanvas.width, this._tmpCanvas.height);
                this._currentLayout.saveInHistory();

                store.dispatch(canStart());
                store.dispatch(imageToolSetFile(null));
                LayoutManager.update();
            }
        })
        this._initDragBlock();
    }

    //добавляем блок для перетаскивания картинки
    _initDragBlock(){
        let dragBlock = document.createElement('div');
        this._dragBlock=dragBlock;
        this._getDragBlockStyle(dragBlock);
        this._workspace.append(dragBlock);

        dragBlock.addEventListener('drop', (e)=>{
            e.preventDefault();
            let files = e.dataTransfer.files; // FileList object.

            //если загрженный файл - картинка
            if(!files[0].type.startsWith('image')){
                alert('FAIL!');
                return;
            }

            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = ()=> {
                // console.log(reader.result);
                let img = new Image();
                img.src = reader.result;
                img.onload = ()=>{

                    store.dispatch(imageToolSetFile(img));
                    store.dispatch(imageToolSetPosition({x: e.x-70, y:e.y-100,
                        width: img.width,
                        height: img.height
                    }));
                    console.log(this._rect);
                    this._rect= [e.x-70, e.y-100, e.x-70+img.width, e.y-100 + img.height];
                    console.log(this._rect);

                    LayoutManager.update();
                }
            };

        })
        dragBlock.addEventListener('dragover', (e)=>{
            console.log('over !');
            dragBlock.classList.add('dragover');
            e.preventDefault();
        })
    }

    //стили для блока с перетаскиванием
    _getDragBlockStyle(dragBlock){
        let state = store.getState();
        dragBlock.style.zIndex = 100;
        dragBlock.style.height = state.canvas.size.height+'px';
        dragBlock.style.width = state.canvas.size.width+'px';

        dragBlock.style.top = state.canvas.position.top;
        dragBlock.style.left = state.canvas.position.left;
        dragBlock.style.position = 'absolute';
        dragBlock.style.transform = `scale(${state.canvas.zoom})`;
        dragBlock.classList.add('drag-block');

        dragBlock.innerHTML = 'Перетащите картинку сюда';
    }

    //стили для ложного канваса с картинкой
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

    _initTmpCanvas(){
        this._tempCanvasListenerManager.addListener(this._tmpCanvas, 'mousedown', (e)=>{
            let x = e.clientX-70;
            let y = e. clientY-100;
            let tmpCanvas = this._tmpCanvas;
            let tmpCtx = this._tmpCtx;
            let position = store.getState().imageTool.position;
            let currentLayout = store.getState().layouts.currentLayout;
            if(this._rect.length!==null &&
                (x>this._rect[0] && x<this._rect[2])
                && (y>this._rect[1] && y<this._rect[3])){

                //получаем imageData перетаскиваемого куска
                //вычисляем смещение относительно того места куда кликнули
                let offsetX = x-this._rect[0];
                let offsetY = y-this._rect[1];

                //при перемещении двигаем на ложном холсте вырезанный кусок

                this._tempCanvasListenerManager.addListener(tmpCanvas, 'mousemove', (e)=>{
                    store.dispatch(imageToolSetPosition({x: e.offsetX-offsetX, y:e.offsetY-offsetY,
                        width: position.width,
                        height: position.height
                    }));
                    console.log(this._rect);

                });

                this._tempCanvasListenerManager.addListener(tmpCanvas, 'mouseup', (e)=>{
                    this._tempCanvasListenerManager.removeListenersByEvent(tmpCanvas, 'mousemove');
                    this._tempCanvasListenerManager.removeListenersByEvent(tmpCanvas, 'mouseup')
                    LayoutManager.update();
                });
            }
            //отпустили кнопку мыши не на выделенной части
            else {
                //очищаем ложный холст и переходим в режим выделение области
                console.log(this._rect);
                store.dispatch(finish());
                tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
            }
        })
    }

    destroy() {
        this._dragBlock.remove();
        this._unsubscribe();
        this._tmpCanvas.remove();
        this._tempCanvasListenerManager.removeAllListener();
    }

}