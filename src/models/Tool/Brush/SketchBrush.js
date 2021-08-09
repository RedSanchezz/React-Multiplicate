import store from '../../../redux/store';
import Brush from './Brush';
import LayoutManager from './../../../Managers/LayoutManager/LayoutManager';


export default class SketchBrush extends Brush {
    constructor() {
        super();
        this.started = false;
        let state = store.getState();
        this._canvasBlock = state.canvas.canvasBlock;
    }

    create() {
        var ppts = [];

        const tmpCanvas = document.createElement('canvas');
        this._fakeCanvas = tmpCanvas;

        let state = store.getState();

        tmpCanvas.style.zIndex = 100;
        tmpCanvas.height = state.canvas.size.height;
        tmpCanvas.width = state.canvas.size.width;
        tmpCanvas.style.top = state.canvas.position.top;
        tmpCanvas.style.left = state.canvas.position.left;
        tmpCanvas.style.position = 'absolute';
        //для удобства
        tmpCanvas.classList.add('tmpCanvas');

        tmpCanvas.style.cursor = 'crosshair';
        const tmp_ctx = tmpCanvas.getContext('2d');
        this._canvasBlock.prepend(tmpCanvas);
        //Нажимаем на клавишу мыши
        this._listenerManager.addListener(this._canvasBlock, 'mousedown', (e) => {

            let state = store.getState();
            if (state.layouts.currentLayout.isHidden()) {
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
            tmp_ctx.lineCap = this._ctx.lineCap;

            tmpCanvas.style.transform = `scale(${state.canvas.zoom})`;
            tmpCanvas.style.top = state.canvas.position.top + 'px';
            tmpCanvas.style.left = state.canvas.position.left + 'px';

            onPaint(e);
            this._listenerManager.addListener(tmpCanvas, 'mousemove', onPaint);
        });

        //когда отжимаем клавишу мыши
        this._listenerManager.addListener(this._canvasBlock, 'mouseup', () => {
            endPaint.call(this);
        });

        //когда мышка уходит с холста
        this._listenerManager.addListener(this._canvasBlock, 'mouseleave', () => {
            endPaint.call(this);
        });

        function endPaint() {
            if (this.started) {
                this.started = false;

                this._listenerManager.removeListener(tmpCanvas, 'mousemove', onPaint);
                this._ctx.drawImage(tmpCanvas, 0, 0);

                let state = store.getState();
                LayoutManager.update();
                state.layouts.currentLayout.saveInHistory();

                tmp_ctx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);

                ppts = [];
            }
        }

        var onPaint = (e) => {
            let x = e.offsetX;
            let y = e.offsetY;
            ppts.push({x, y});

            tmp_ctx.beginPath();
            // tmp_ctx.moveTo(ppts[0].x, ppts[0].y);
            tmp_ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            if (ppts.length <= 3) {
                tmp_ctx.arc(ppts[0].x, ppts[0].y, 0, 0, 2 * Math.PI);
            }
            for (var i = 1; i < ppts.length - 2; i++) {
                var c = (ppts[i].x + ppts[i + 1].x) / 2;
                var d = (ppts[i].y + ppts[i + 1].y) / 2;
                tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
            }
            tmp_ctx.stroke();
        };


    }

    destroy() {
        this._listenerManager.removeAllListener();
        this._fakeCanvas.remove();
    }
}