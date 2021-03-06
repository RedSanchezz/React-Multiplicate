export default class Frame {
    constructor(canvas, delay, id) {
        this._canvas = canvas;
        this._delay = delay;
        this._id = id;
        this._type = 'Frame';
        this._open = false;
        this._isSelect = false;
    }

    getCanvas() {
        return this._canvas;
    }

    setDelay(delay) {
        this._delay = delay;
    }

    getDelay() {
        return this._delay;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }

    isOpen() {
        return this._open;
    }

    open() {
        this._open = true;
    }

    close() {
        this._open = false;
    }

    select(){
        this._isSelect = true;
    }

    unSelect(){
        this._isSelect = false;
    }
    isSelected(){
        return this._isSelect;
    }
}