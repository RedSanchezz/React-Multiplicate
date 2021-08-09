import ListenerManager from '../../../utils/ListenerManager';
import ColorHelper from '../../../utils/ColorHelper';
import Tool from '../Tool';
import store from '../../../redux/store';
import {changeBrushSetting} from '../../../redux/actionCreators/brushActionCreators';

//Базовый класс для кисти
export default class Brush extends Tool {

    constructor() {
        super();
        this._listenerManager = new ListenerManager([]);
    }

    setColor(color) {
        let state = store.getState();
        if (isFinite(state.brush.alpha)) color = ColorHelper.toRgba(color, state.brush.alpha);
        store.dispatch(changeBrushSetting({color}));
    }

    getColor() {
        let state = store.getState();
        return ColorHelper.toHex(state.brush.color);
    }

    //Задаем прозрачность кисти
    setAlpha(alpha) {
        alpha = Math.floor(alpha * 100) / 100;

        store.dispatch(changeBrushSetting({alpha}));

        let state = store.getState();
        this.setColor(state.brush.color);
        // store.dispatch(changeBrushOpacity(alpha));
    }

    getAlpha() {
        let state = store.getState();
        return state.brush.alpha;
    }

    //ширина линии
    setSize(width) {
        store.dispatch(changeBrushSetting({size: width}));
    }

    getSize() {
        return store.getState().brush.size;
    }
}
