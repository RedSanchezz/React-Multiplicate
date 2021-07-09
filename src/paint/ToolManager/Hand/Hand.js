
import store from '../../../redux/store';
import Tool from './../Tool';
import ListenerManager from './../../ListenerManager/ListenerManager';
import { setCanvasPosition, setCanvasZoom } from './../../../redux/actionCreators/canvasActionCreator';

export default class Hand extends Tool {
    constructor(){
        super();
        this._listenerManager= new ListenerManager(new Array());
    }
    create(){
        console.log('create');
        let state = store.getState();
        let canvas = state.canvas.canvas;
        let canvasBlock = state.canvas.canvasBlock;
        console.log(canvasBlock);

        let startYCoord = 0;
        let startXCoord = 0;


        this._listenerManager.addListener(canvas, 'mousedown', (e)=>{

            startYCoord = e.clientY;
            startXCoord = e.clientX;

            this._listenerManager.addListener(canvasBlock, 'mousemove', mouseMove)
        });

        this._listenerManager.addListener(canvas, 'mouseup', (e)=>{
            this._listenerManager.removeListener(canvasBlock, 'mousemove', mouseMove);
            this._listenerManager.removeListener(canvasBlock, 'mouseleave', mouseMove);

        });

        this._listenerManager.addListener(canvas, 'mouseleave', (e)=>{
            this._listenerManager.removeListener(canvasBlock, 'mousemove', mouseMove);
            this._listenerManager.removeListener(canvasBlock, 'mouseleave', mouseMove);
        });


        this._listenerManager.addListener(canvas, 'contextmenu', ()=>{
            store.dispatch(setCanvasZoom(1.5))
        })

        function mouseMove(e){
            //непонятно почему, но реакт не дает работать с offsetX
            

            let state = store.getState();

            let offsetY = -(startYCoord - e.clientY);
            let offsetX = -(startXCoord - e.clientX);


            console.log(offsetX);
            // e.clientY - 100 -yCoord + 'px',

            store.dispatch(setCanvasPosition({
                top: parseInt(state.canvas.position.top) +offsetY + 'px',
                left: parseInt(state.canvas.position.left) +offsetX + 'px'
            }))
            startYCoord=startYCoord + offsetY;
            startXCoord=startXCoord + offsetX;

        }

    }
    destroy(){
        this._listenerManager.removeAllListener();
    }

}