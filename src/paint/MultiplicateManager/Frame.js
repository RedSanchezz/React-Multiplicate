
export default class Frame{
    constructor(canvas,  delay, id){
        this._canvas = canvas;
        this._delay = delay;
        this._id= id;
    }
    
    getCanvas(){
        return this._canvas;
    }

    setDelay(delay){
        this._delay = delay;
    }
    getDelay(){
        return this._delay;
    }

    setId(id){
        this._id = id;
    }
    getId(){
        return this._id;
    }
}