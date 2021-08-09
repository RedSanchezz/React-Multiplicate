import store from '../../../redux/store';
import LayoutManager from '../../../Managers/LayoutManager/LayoutManager';
import Brush from '../Brush/Brush';

export default class Eraser extends Brush {

    create() {
        var ppts = [];

        const tmpCanvas = document.createElement('canvas');
        this._fakeCanvas = tmpCanvas;

        let state = store.getState();

        tmpCanvas.style.zIndex = 100;

        tmpCanvas.height = state.canvas.size.height;
        tmpCanvas.width = state.canvas.size.width;


        tmpCanvas.style.transform = `scale(${state.canvas.zoom})`;
        tmpCanvas.style.top = state.canvas.position.top;
        tmpCanvas.style.left = state.canvas.position.left;
        tmpCanvas.style.position = 'absolute';
        //для удобства
        tmpCanvas.classList.add('tmpCanvas');

        tmpCanvas.style.cursor = 'crosshair';


        const tmpCtx = tmpCanvas.getContext('2d');
        state.canvas.canvasBlock.prepend(tmpCanvas);

        this._listenerManager.addListener(tmpCanvas, 'mousedown', (e) => {

            let state = store.getState();

            this._ctx = state.layouts.currentLayout.getContext();
            this._canvas = state.layouts.currentLayout.getCanvas();

            this._ctx.lineWidth = state.brush.size;
            this._ctx.lineCap = 'round';

            tmpCtx.lineWidth = this._ctx.lineWidth;
            tmpCtx.lineCap = this._ctx.lineCap;

            this._ctx.strokeStyle = state.setting.canvasDefaultBackground;
            tmpCtx.strokeStyle = state.setting.canvasDefaultBackground;

            onPaint(e);

            this._listenerManager.addListener(tmpCanvas, 'mousemove', onPaint);
        });

        this._listenerManager.addListener(tmpCanvas, 'mouseup', () => {
            this._listenerManager.removeListener(tmpCanvas, 'mousemove', onPaint);

            let imageData = testFunc(tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height), this._ctx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height));

            this._ctx.putImageData(imageData, 0, 0);

            LayoutManager.update();
            state.layouts.currentLayout.saveInHistory();

            tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
            ppts = [];
        });

        var onPaint = (e) => {
            let x = e.offsetX;
            let y = e.offsetY;
            ppts.push({x, y});

            tmpCtx.beginPath();
            tmpCtx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            if (ppts.length <= 3) {
                tmpCtx.arc(ppts[0].x, ppts[0].y, 0, 0, 2 * Math.PI);
            }
            for (var i = 1; i < ppts.length - 2; i++) {
                var c = (ppts[i].x + ppts[i + 1].x) / 2;
                var d = (ppts[i].y + ppts[i + 1].y) / 2;
                tmpCtx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
            }

            tmpCtx.stroke();
        };
    }

    destroy() {
        this._listenerManager.removeAllListener();
        this._fakeCanvas.remove();
    }
}

//принимает 2 imageData 
function testFunc(tmpID, trueID) {
    // 4 символа red green blue opacity
    for (let i = 0; i < tmpID.data.length; i = i + 4) {
        if (tmpID.data[i + 3] === 255) {
            trueID.data[i + 3] = 0;
        }
    }
    return trueID;
}
