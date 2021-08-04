import Tool from '../Tool';
import ListenerManager from '../../../utils/ListenerManager';
import store from '../../../redux/store';
import LayoutManager from '../../../Managers/LayoutManager/LayoutManager';
import {
    acceptChanges,
    disableDragBlock,
    enableDragBlock, finish,
    imageToolSetFile, imageToolSetPosition
} from '../../../redux/actionCreators/imageToolActionCreator';

export default class ImageTool extends Tool{
    constructor() {
        super();
        this._listenerManager = new ListenerManager([]);
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
            }
            //если файл не установлен и блок для перетаскивания не активен
            if(!state.imageTool.file && !state.imageTool.dragBlockEnabled) {
                this._workspace.append(this._dragBlock)
                store.dispatch(enableDragBlock());
            }
            if(state.imageTool.position.changed) {
                let img = state.imageTool.file;
                let position = state.imageTool.position;

                this._tmpCtx.clearRect(0,0, this._tmpCanvas.width, this._tmpCanvas.height);
                this._tmpCtx.drawImage(img, position.x, position.y, position.width, position.height);
                this._tmpCtx.strokeRect(position.x, position.y, position.width, position.height);
                store.dispatch(acceptChanges());
            }
            if(state.imageTool.finish){
                let img = state.imageTool.file;
                let position = state.imageTool.position;

                this._tmpCtx.clearRect(0,0, this._tmpCanvas.width, this._tmpCanvas.height);
                this._tmpCtx.drawImage(img, position.x, position.y, position.width, position.height);

                this._ctx.drawImage(this._tmpCanvas,0,0);

                store.dispatch(finish());
                store.dispatch(imageToolSetFile(null));
                LayoutManager.update();
            }


        })

        this._initDragBlock();
    }

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
                    console.log(e.x-70, e.y-100);
                    // this._tmpCtx.drawImage(img, e.x-70, e.y-100);
                        store.dispatch(imageToolSetPosition({x: e.x-70, y:e.y-100,
                        width: img.width,
                        height: img.height
                    }))
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

        dragBlock.innerHTML = 'this is drag block';

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

    destroy() {
        this._dragBlock.remove();
        this._unsubscribe();
        this._tmpCanvas.remove();
    }

}