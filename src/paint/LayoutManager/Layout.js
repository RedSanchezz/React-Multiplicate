import LayoutManager from "./LayoutManager";

export default class Layout {
    constructor(canvas, ctx, show){
        this._canvas = canvas;
        this._ctx = ctx;
        this._show=show;
        this._name=null;
        this._historyArr=[];
        this._positionInHistory=-1;
        this.saveInHistory();
        this.selected = false;
    }

    toggleHide(){
        if(this._show){
            this._show=false;
        }
        else {
            this._show=true;
        }
    }

    isHidden(){
        return !this._show;
    }

    getCanvas(){
        return this._canvas;
    }

    getContext(){
        return this._ctx;
    }
    
    clear(){
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._historyArr=[];
    }

    saveInHistory(){
        if(this._positionInHistory !== this._historyArr.length-1){
            this._historyArr=this._historyArr.slice(0, this._positionInHistory+1);
        }
        if(this._historyArr.length>40){
            this._historyArr.shift();
        }
        this._historyArr.push(this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height));
        this._positionInHistory = this._historyArr.length-1;
    }

    back(){
        if(this._positionInHistory!==0){ 
            this._positionInHistory-=1;
            this._ctx.putImageData(this._historyArr[this._positionInHistory],0,0);
            LayoutManager.update();
        }
    }

    next(){
        if(this._positionInHistory!==this._historyArr.length-1){ 
            this._positionInHistory+=1;
            this._ctx.putImageData(this._historyArr[this._positionInHistory],0,0);
            LayoutManager.update();
        }
    }

    select(){
        this.selected=!this.selected;
        console.log('model' + this.selected);
    }
}