import Tool from '../Tool';
import ListenerManager from '../../../utils/ListenerManager';
import store from '../../../redux/store';
import LayoutManager from '../../../Managers/LayoutManager/LayoutManager';
import {
    acceptChanges, canStart,
    disableDragBlock,
    enableDragBlock, finish,
    setFile, setPosition
} from '../../../redux/actionCreators/imageToolActionCreator';


export default class ImageTool extends Tool{
    constructor() {
        super();
        this._listenerManager = new ListenerManager([]);
        this._tmpCanvasListenerManager = new ListenerManager([]);

        this._rect = [];
        this._painted = false;
        this._dragBlock = null;
        this._unsubscribe = null;
        this._workspace = null;
        this._tmpCanvas = null;
        this._tmpCtx = null;
    }
    create() {
        super._init();
        //подписываемся на изменения state
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
                this._tmpCanvasListenerManager.removeAllListener();
                this._removeTmpCanvasLogic();
                store.dispatch(enableDragBlock());
            }

            //если изменили позицию картинки
            if(state.imageTool.position.changed) {
                let img = state.imageTool.file;
                let position = state.imageTool.position;
                //перерисовываем
                this._tmpCtx.clearRect(0,0, this._tmpCanvas.width, this._tmpCanvas.height);
                this._tmpCtx.drawImage(img, position.x, position.y, position.width, position.height);

                //задаем новую позицию картинке
                this._rect= [position.x, position.y,position.x+ +position.width, position.y + +position.height];
                //ставим imageTool.position.changed в неактивное положение
                store.dispatch(acceptChanges());
            }
            // если закончили работать с изображением
            if(state.imageTool.finish){
                let ctx = state.layouts.currentLayout.getContext();
                //переносим с ложного на настоящий холст
                ctx.drawImage(this._tmpCanvas,0,0);

                this._tmpCtx.clearRect(0,0, this._tmpCanvas.width, this._tmpCanvas.height);

                this._currentLayout.saveInHistory();

                //finish === false
                store.dispatch(canStart());
                store.dispatch(setFile(null));
                LayoutManager.update();
            }
        })
        //Изначально вставляем блок для перетаскивания картинки
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
            let files = e.dataTransfer.files;

            //если загрженный файл - картинка
            if(!files[0].type.startsWith('image')){
                alert('FAIL!');
                return;
            }

            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = ()=> {
                let img = new Image();
                img.src = reader.result;
                img.onload = ()=>{

                    store.dispatch(setFile(img));
                    store.dispatch(setPosition({x: e.offsetX, y:e.offsetY,
                        width: img.width,
                        height: img.height
                    }));
                    this._rect= [e.offsetX, e.offsetY, e.offsetX+img.width, e.offsetX + img.height];

                    LayoutManager.update();
                }
            };

        })
        dragBlock.addEventListener('dragover', (e)=>{
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

        dragBlock.innerHTML = 'Перетащите изображение сюда';
    }

    _initTmpCanvas(){
        this._tmpCanvasListenerManager.addListener(this._tmpCanvas, 'mousedown', (e)=>{
            let x = e.offsetX;
            let y = e.offsetY;
            let tmpCanvas = this._tmpCanvas;
            let tmpCtx = this._tmpCtx;
            let position = store.getState().imageTool.position;
            if(this._rect.length!==null &&
                (x>this._rect[0] && x<this._rect[2])
                && (y>this._rect[1] && y<this._rect[3])){

                //получаем imageData перетаскиваемого куска
                //вычисляем смещение относительно того места куда кликнули
                let offsetX = x-this._rect[0];
                let offsetY = y-this._rect[1];

                //при перемещении двигаем на ложном холсте вырезанный кусок

                this._tmpCanvasListenerManager.addListener(tmpCanvas, 'mousemove', (e)=>{
                    store.dispatch(setPosition({x: e.offsetX-offsetX, y:e.offsetY-offsetY,
                        width: position.width,
                        height: position.height
                    }));
                });

                this._tmpCanvasListenerManager.addListener(tmpCanvas, 'mouseup', (e)=>{
                    this._tmpCanvasListenerManager.removeListenersByEvent(tmpCanvas, 'mousemove');
                    this._tmpCanvasListenerManager.removeListenersByEvent(tmpCanvas, 'mouseup')
                    LayoutManager.update();
                });
            }
            //отпустили кнопку мыши не на выделенной части
            else {
                //очищаем ложный холст и переходим в режим выделения области
                store.dispatch(finish());
                tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
            }
        })
    }
    _removeTmpCanvasLogic(){
        this._tmpCanvasListenerManager.removeAllListener();
    }

    destroy() {
        this._dragBlock.remove();
        this._unsubscribe();
        this._tmpCanvas.remove();
        this._tmpCanvasListenerManager.removeAllListener();
        store.dispatch(disableDragBlock());
        store.dispatch(canStart());
        store.dispatch(setFile(null));
    }

}