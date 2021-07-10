import store from "../../redux/store";

export default class Tool{
    constructor(){
    }

    create(){
    }

    destroy(){
    }

    setLayout(canvas, ctx){
        this._canvas=canvas;
        this._ctx = ctx;
    }
}