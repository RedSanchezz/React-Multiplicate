import store from '../../../redux/store';
import Tool from '../Tool';
import ListenerManager from '../../../utils/ListenerManager';
import {setCanvasPosition, setCanvasZoom} from '../../../redux/actionCreators/canvasActionCreator';

export default class Hand extends Tool {
    constructor() {
        super();
        this._listenerManager = new ListenerManager([]);
    }

    create() {
        let state = store.getState();
        let canvas = state.canvas.canvas;
        let canvasBlock = state.canvas.canvasBlock;

        let startYCoord = 0;
        let startXCoord = 0;

        canvas.style.cursor = 'move';

        this._listenerManager.addListener(canvas, 'mousedown', (e) => {

            startYCoord = e.clientY;
            startXCoord = e.clientX;

            this._listenerManager.addListener(canvasBlock, 'mousemove', mouseMove);
        });

        this._listenerManager.addListener(canvas, 'mouseup', (e) => {
            this._listenerManager.removeListener(canvasBlock, 'mousemove', mouseMove);
            this._listenerManager.removeListener(canvasBlock, 'mouseleave', mouseMove);

        });

        this._listenerManager.addListener(canvas, 'mouseleave', (e) => {
            this._listenerManager.removeListener(canvasBlock, 'mousemove', mouseMove);
            this._listenerManager.removeListener(canvasBlock, 'mouseleave', mouseMove);
        });


        this._listenerManager.addListener(canvas, 'contextmenu', () => {
            store.dispatch(setCanvasZoom(1.5));
        });

        function mouseMove(e) {
            //непонятно почему, но реакт не дает работать с offsetX


            let state = store.getState();

            let offsetY = -(startYCoord - e.clientY);
            let offsetX = -(startXCoord - e.clientX);

            store.dispatch(setCanvasPosition({
                top: parseInt(state.canvas.position.top) + offsetY + 'px',
                left: parseInt(state.canvas.position.left) + offsetX + 'px'
            }));
            startYCoord = startYCoord + offsetY;
            startXCoord = startXCoord + offsetX;
        }
    }

    destroy() {
        let state = store.getState();
        let canvas = state.canvas.canvas;
        this._listenerManager.removeAllListener();
        canvas.style.cursor = 'default';

    }

}