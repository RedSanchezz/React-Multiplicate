import { changeCurrentLayout, changeLayoutList } from "../../redux/actionCreators/layoutActionCreator";
import store from "../../redux/store";
import Layout from "./Layout";

//Класс для управления слоями
export default class LayoutManager{
    constructor(){
        let state = store.getState();
        //true canvas 
        this._canvas = state.canvas.canvas;
        this._ctx = state.canvas.context;

        this._init();
        //колбэк для управления слоями из оболочки
    }
    _init(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;

        let defCanvas = document.createElement("canvas");
        defCanvas.width=state.canvas.size.width;
        defCanvas.height=state.canvas.size.height;

        let defCtx = defCanvas.getContext("2d");

        defCtx.putImageData(this._ctx.createImageData( defCanvas.width, defCanvas.height),0,0);
        
        let layout = new Layout(defCanvas, defCtx, true, this);


        layoutList.push(layout);

        store.dispatch(changeLayoutList(layoutList))
        store.dispatch(changeCurrentLayout(layout, currentLayoutIndex));
    }

    //обновляем канвас, из всех слоев
    update(){
        let state = store.getState();
        let layoutList= state.layouts.layoutList;

        this._ctx.clearRect(0, 0, state.canvas.size.width, state.canvas.size.height);
        for(let i=0; i< layoutList.length; i++){
            if(!layoutList[i].isHidden()) this._ctx.drawImage(layoutList[i].getCanvas(),0,0);
        }
    }

    //Добавляем новый пустой слой
    addLayout(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        let canvas = document.createElement("canvas");

        canvas.width = state.canvas.size.width;
        canvas.height= state.canvas.size.height;
        let context = canvas.getContext("2d");
        let layout= new Layout(canvas, context, true, this);

        layoutList.splice(state.layouts.currentLayoutIndex+1, 0, layout);
        store.dispatch(changeCurrentLayout(layout, state.layouts.currentLayoutIndex+1));

        store.dispatch(changeLayoutList(layoutList));

    }

    copyLayout(index){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;


        let canvas = document.createElement("canvas");
        canvas.width = state.canvas.size.width;
        canvas.height= state.canvas.size.height;
        let context = canvas.getContext("2d");

        context.drawImage(state.layouts.layoutList[index].getCanvas(),0,0);
        let layout= new Layout(canvas, context, true, this);

        layoutList.splice(index+1, 0, layout);

        if(state.layouts.currentLayoutIndex>index){
            this.setCurrentLayout(state.layouts.currentLayoutIndex+1);
        } else {
            console.log("Ошибка будет !");
            this.update();
        }
    }


    //получаем список картинок из слоев
    getCanvasList(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        let imageList =[];
        for(let i=0; i< layoutList.length; i++){

            let img = document.createElement("img");
            
            let src=layoutList[i].getCanvas().toDataURL();

            img.setAttribute("src", src);
            img.setAttribute("data-index", i);
            
            let objImg = {
                src: src,
                dataIndex: i,
                id: i,
                isCurrent: i===this.getCurrentLayoutIndex(),
                isHidden: this.isHidden(i),
                selected: layoutList[i].selected
            }
            imageList.push(objImg);
        }
        return imageList;
    }
    //Возвращает обьект 
    getCurrentLayout(){
        return store.getState().layouts.currentLayout;
    }

    setCurrentLayout(index){
        if(index<0) index=0;
        let currentLayout = store.getState().layouts.layoutList[index];
        store.dispatch(changeCurrentLayout(currentLayout, index));
    }

    getCurrentLayoutIndex(){
        let state = store.getState();
        return +state.layouts.currentLayoutIndex;
    }

    
    toggleHide(index){
        let state = store.getState();
        index=+index;
        state.layouts.layoutList[index].toggleHide();
        this.update();
    }

    deleteLayout(index){
        console.log('delete layout index ' + index);
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayout = state.layouts.currentLayout;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;
        //если остался 1 слой, то просто очищаем его
        if(layoutList.length<=1){
            currentLayout.clear();
            this.update();
            this.setCurrentLayout(currentLayoutIndex);
            return;
        }
        layoutList.splice(index,1);

        //Если элемент который надо удалить находится выше нужного
        if(currentLayoutIndex>=index){
            console.log(currentLayoutIndex-1);
            this.setCurrentLayout(currentLayoutIndex-1);
        }
        else{
            console.log(currentLayoutIndex);
            this.setCurrentLayout(currentLayoutIndex);
        }
        this.update();
    }

    deleteLayouts(indexArray){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayout = state.layouts.currentLayout;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;

        if(layoutList.length<=1){
            currentLayout.clear();
            this.update();
            return;
        }

        layoutList= layoutList.filter((value, index, array) => {
            return !indexArray.includes(index);
        });

        if(layoutList.length==0){
            console.log("Нулевая длинна");
            this.addLayout();
            this.setCurrentLayout(0);
        }
        else{
            //если индекс больше допустимого
            if(currentLayoutIndex >= layoutList.length-1){
                this.setCurrentLayout(layoutList.length-1);
                console.log(layoutList);
                console.log("Больше чем нужно");
            }
            else{
                this.setCurrentLayout(currentLayoutIndex);
                console.log("Норм");
            }
        }
        console.log(layoutList);
        this.update();
    }
    
    swap(index1, index2){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;

        if(index1<0 || index1 > layoutList.length-1 || index2<0 || index2 > layoutList.length-1) {
            return;
        }

        let help = layoutList[index1];
        layoutList[index1]=layoutList[index2];
        layoutList[index2]=help;

        if(index1==currentLayoutIndex){
            this.setCurrentLayout(index2);
        }
        else if(index2==currentLayoutIndex){
            this.setCurrentLayout(index1);
        } else {
            this.setCurrentLayout(currentLayoutIndex);
        }
        this.update();
    }
    
    combine(index1, index2){

    }

    isHidden(index){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        return layoutList[index].isHidden();
    }
    getLayoutList(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        return layoutList;
    }
    setLayout(layout, index){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        layoutList[index]=layout;
        this.update();
    }
    select(id){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        layoutList[id].select();
        this.update();
    }

    unSelectAll(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        layoutList.forEach((layout) => {
            if(layout.selected) layout.select();
        });
        this.update();
    }
    render(){
        let state = store.getState();
        store.dispatch(changeCurrentLayout(state.layouts.currentLayout, state.layouts.currentLayoutIndex));
    }
}

/*
    show: true,
    canvas: canvas,
    ctx:ctx
*/
