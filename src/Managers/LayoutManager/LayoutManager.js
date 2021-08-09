import {changeCurrentLayout, changeLayoutList} from '../../redux/actionCreators/layoutActionCreator';
import store from '../../redux/store';
import Layout from './../../models/Layout';

//Класс для управления слоями
export default class LayoutManager {

    static id = 0;

    static init() {
        let state = store.getState();

        let mainCanvas = state.canvas.canvas;
        let mainCanvasCtx = state.canvas.context;

        let layoutList = state.layouts.layoutList;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;
        //если список слоев пуст, создаем один слой
        if (layoutList.length === 0) {
            let defLayoutCanvas = document.createElement('canvas');
            defLayoutCanvas.width = state.canvas.size.width;
            defLayoutCanvas.height = state.canvas.size.height;

            let defLayoutCtx = defLayoutCanvas.getContext('2d');

            defLayoutCtx.putImageData(mainCanvasCtx.createImageData(mainCanvas.width, mainCanvas.height), 0, 0);
            let layout = new Layout(defLayoutCanvas, defLayoutCtx, true, ++LayoutManager.id);

            layoutList.push(layout);
            store.dispatch(changeLayoutList(layoutList));
            store.dispatch(changeCurrentLayout(layout, currentLayoutIndex));
        }

        this.update();
        store.dispatch(changeLayoutList(state.layouts.layoutList));
    }
    //рисуем на основном холсте все слои
    static update() {
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let mainCanvasCtx = state.canvas.context;

        mainCanvasCtx.clearRect(0, 0, state.canvas.size.width, state.canvas.size.height);
        for (let i = 0; i < layoutList.length; i++) {
            if (!layoutList[i].isHidden()) mainCanvasCtx.drawImage(layoutList[i].getCanvas(), 0, 0);
        }
    }


    static changeLayoutList(layoutList) {
        store.dispatch(changeLayoutList(layoutList));
        this.update();
    }

    //Добавляем новый пустой слой
    static addLayout() {
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        let canvas = document.createElement('canvas');

        canvas.width = state.canvas.size.width;
        canvas.height = state.canvas.size.height;

        let context = canvas.getContext('2d');
        let layout = new Layout(canvas, context, true, ++LayoutManager.id);

        layoutList.splice(state.layouts.currentLayoutIndex + 1, 0, layout);
        store.dispatch(changeCurrentLayout(layout, state.layouts.currentLayoutIndex + 1));
        store.dispatch(changeLayoutList(layoutList));
    }

    static copyLayouts(){
        let state = store.getState();

        const layoutList = state.layouts.layoutList;

        let newLayoutList = Array.from(layoutList);

        let addedCount=0;
         layoutList.forEach((layout, index)=>{
            if(layout.isSelected()){
                let canvas = document.createElement('canvas');
                canvas.width = state.canvas.size.width;
                canvas.height = state.canvas.size.height;
                let context = canvas.getContext('2d');
                context.drawImage(state.layouts.layoutList[index].getCanvas(), 0, 0);
                let layout = new Layout(canvas, context, true, ++LayoutManager.id);
                newLayoutList.splice(index+addedCount, 0, layout);
                addedCount++;
            }
        });
        store.dispatch(changeLayoutList(newLayoutList));
    }

    //Возвращает класс с выбраным слоем 
    static getCurrentLayout() {
        return store.getState().layouts.currentLayout;
    }

    static setCurrentLayout(index) {
        if (index < 0) index = 0;
        let currentLayout = store.getState().layouts.layoutList[index];
        store.dispatch(changeCurrentLayout(currentLayout, index));
    }

    static getCurrentLayoutIndex() {
        let state = store.getState();
        return +state.layouts.currentLayoutIndex;
    }


    static toggleHide(index) {
        let state = store.getState();
        index = +index;
        state.layouts.layoutList[index].toggleHide();
        store.dispatch(changeLayoutList(state.layouts.layoutList));
        this.update();
    }


    static deleteLayout(index) {
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayout = state.layouts.currentLayout;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;
        //если остался 1 слой, то просто очищаем его
        if (layoutList.length <= 1) {
            currentLayout.clear();
            this.update();
            return;
        }

        layoutList.splice(index, 1);
        //Если элемент который надо удалить находится выше нужного
        if (currentLayoutIndex >= index) this.setCurrentLayout(currentLayoutIndex - 1);
         else this.setCurrentLayout(currentLayoutIndex);

        store.dispatch(changeLayoutList(state.layouts.layoutList));
        this.update();
    }


    static deleteSelectedLayouts(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayout = state.layouts.currentLayout;
        let currentLayoutIndex = state.layouts.currentLayoutIndex;

        let newLayoutList = layoutList.filter((layout)=>!layout.isSelected());

        //если не осталось ни 1 слоя
        if (newLayoutList.length === 0) {
            let canvas = document.createElement('canvas');
            canvas.width = state.canvas.size.width;
            canvas.height = state.canvas.size.height;
            let context = canvas.getContext('2d');
            let layout = new Layout(canvas, context, true, ++LayoutManager.id);
            newLayoutList.push(layout);
        }
        store.dispatch(changeLayoutList(newLayoutList));

        //если не удалили активный слой
        currentLayoutIndex = newLayoutList.indexOf(currentLayout);
        if(currentLayoutIndex===-1) this.setCurrentLayout(0);
        else this.setCurrentLayout(currentLayoutIndex);

        this.update();
    }


    static swap(index1, index2) {
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        let currentLayout= state.layouts.currentLayout;

        //если передали не существующие индексы
        if (!layoutList[index1] || !layoutList[index2]) return;

        let help = layoutList[index1];
        layoutList[index1] = layoutList[index2];
        layoutList[index2] = help;

        let currentLayoutIndex = layoutList.indexOf(currentLayout);
        this.setCurrentLayout(currentLayoutIndex);

        this.update();
        store.dispatch(changeLayoutList(state.layouts.layoutList));
    }


    static combineSelected(){
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        let selectedLayouts = layoutList.filter(layout=>layout.isSelected());
        let indexArray =[];
        selectedLayouts.forEach(layout=>{
            indexArray.push(layoutList.indexOf(layout));
        })

        let minIndex = Math.min(...indexArray);
        let minIndexLayout = layoutList[minIndex];


        selectedLayouts.forEach((layout, index)=>{
           index!==0 && minIndexLayout.getContext().drawImage(layout.getCanvas(), 0, 0);
        })

        indexArray=indexArray.slice(1);
        minIndexLayout.saveInHistory();

        layoutList = layoutList.filter((layout, index)=>!indexArray.includes(index));
        store.dispatch(changeLayoutList(layoutList));

        this.setCurrentLayout(minIndex);

    }

    static getLayoutList() {
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        return layoutList;
    }

    static setLayout(layout, index) {
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        layoutList[index] = layout;
        this.update();
    }

    //Выделить слой ( ctrl + mouse1)
    static select(index) {
        let state = store.getState();
        let layoutList = state.layouts.layoutList;

        layoutList[index].select();
        store.dispatch(changeLayoutList(layoutList));
        this.update();
    }

    //сделать все не выделенными
    static unSelectAll() {
        let state = store.getState();
        let layoutList = state.layouts.layoutList;
        layoutList.forEach((layout) => {
            if (layout.isSelected()) layout.select();
        });
        store.dispatch(changeLayoutList(layoutList));
        this.update();
    }
}

