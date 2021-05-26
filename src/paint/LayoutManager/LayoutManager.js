import { changeCurrentLayout, changeLayoutList } from "../../redux/actionCreators/layoutActionCreator";
import store from "../../redux/store";
import Layout from "./Layout";

//Класс для управления слоями
export default class LayoutManager{

    static init(){
        let state = store.getState();

        let mainCanvas = state.canvas.canvas;
        let mainCanvasCtx = state.canvas.context;

        let layoutList = state.layouts.layoutList;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;
        if(layoutList.length==0){

        
        let defLayoutCanvas = document.createElement("canvas");
        defLayoutCanvas.width=state.canvas.size.width;
        defLayoutCanvas.height=state.canvas.size.height;

        let defLayoutCtx = defLayoutCanvas.getContext("2d");

        defLayoutCtx.putImageData(mainCanvasCtx.createImageData(mainCanvas.width, mainCanvas.height),0,0);
        let layout = new Layout(defLayoutCanvas, defLayoutCtx, true, this);

        layoutList.push(layout);

            store.dispatch(changeLayoutList(layoutList))
            store.dispatch(changeCurrentLayout(layout, currentLayoutIndex));
        }
        this.update();
        this.renderAll();
    }

    //обновляем канвас, из всех слоев
    static update(){
        let state = store.getState();
        let layoutList= state.layouts.layoutList;
        let mainCanvasCtx = state.canvas.context;

        mainCanvasCtx.clearRect(0, 0, state.canvas.size.width, state.canvas.size.height);
        for(let i=0; i< layoutList.length; i++){
            if(!layoutList[i].isHidden()) mainCanvasCtx.drawImage(layoutList[i].getCanvas(),0,0);
        }
    }

    static changeLayoutList(layoutList){
        store.dispatch(changeLayoutList(layoutList));
    }
    //Добавляем новый пустой слой
    static addLayout(){
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

    static copyLayout(index){
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
    static getCanvasList(){
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
    static getCurrentLayout(){
        return store.getState().layouts.currentLayout;
    }

    static setCurrentLayout(index){
        if(index<0) index=0;
        let currentLayout = store.getState().layouts.layoutList[index];
        store.dispatch(changeCurrentLayout(currentLayout, index));
    }

    static getCurrentLayoutIndex(){
        let state = store.getState();
        return +state.layouts.currentLayoutIndex;
    }

    
    static toggleHide(index){
        let state = store.getState();
        index=+index;
        state.layouts.layoutList[index].toggleHide();
        this.update();
        this.renderCurrent();
    }

    static deleteLayout(index){
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

    static deleteLayouts(indexArray){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayout = state.layouts.currentLayout;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;

        if(layoutList.length<=1){
            currentLayout.clear();
            this.update();
            store.dispatch(changeLayoutList(layoutList));
            return;
        }

        layoutList= layoutList.filter((value, index, array) => {
            return !indexArray.includes(index);
        });

        store.dispatch(changeLayoutList(layoutList));

        if(layoutList.length==0){
            console.log("Нулевая длинна");
            this.addLayout();
            this.setCurrentLayout(0);
            this.update();
            return;
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
        this.update();
    }
    
    static swap(index1, index2){
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
        this.renderAll();
    }
    
    static combine(indexArray){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;

        let minIndex = Math.min(...indexArray);
        let minElem = layoutList[minIndex];

        for(let i=1; i<indexArray.length; i++){
            const elem = layoutList[indexArray[i]];
            console.log(i);
            minElem.getContext().drawImage(elem.getCanvas(), 0, 0);
        }
        minElem.saveInHistory();
        console.log(indexArray.slice(1));
        store.dispatch(changeLayoutList(layoutList));

        this.deleteLayouts(indexArray.slice(1))
        
    }

    static isHidden(index){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        return layoutList[index].isHidden();
    }
    static getLayoutList(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        return layoutList;
    }
    static setLayout(layout, index){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        layoutList[index]=layout;
        this.update();
    }
    static select(id){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        
        layoutList[id].select();
        store.dispatch(changeLayoutList(layoutList))
        this.update();
    }

    static unSelectAll(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        layoutList.forEach((layout) => {
            if(layout.selected) layout.select();
        });
        store.dispatch(changeLayoutList(layoutList))

        this.update();
    }
    //обновляем все связанное с выбранным элементом
    static renderCurrent(){
        let state = store.getState();
        store.dispatch(changeCurrentLayout(state.layouts.currentLayout, state.layouts.currentLayoutIndex));
    }
    static renderAll(){
        let state = store.getState();
        store.dispatch(changeLayoutList(state.layouts.layoutList));
    }
}

