

export default class GroupFrames{
    constructor(){
        this.frames = [];
        this._type='GroupFrames';
        this._id = 0;
    }
    getId(){
        return this._id;
    }
    setId(id){
        this._id = id;
    }
    addFrame(frame){
        this.frames.push(frame);
    }
    removeFrame(id){
        this.frames.splice(id, 1);
    }
    getFrames(){
        return this.frames;
    }
    getType(){
        return this._type;
    }
}