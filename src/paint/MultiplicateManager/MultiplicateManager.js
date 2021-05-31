import { changeFrameList, setCurrentFrame, setMultiplicateCanvas, stopPlay } from "../../redux/actionCreators/multiplicateActionCreators";
import {play} from "../../redux/actionCreators/multiplicateActionCreators";

import store from "../../redux/store";
import Frame from "./Frame";


//Прослойка для работы с фреймами

export default class MultiplicateManager {
    constructor(){
    }

    static id=0;
    
    static addFrame(layout, delay){
        let canvas = document.createElement('canvas');
        canvas.width=layout.getCanvas().width;
        canvas.height=layout.getCanvas().height;
        canvas.getContext('2d').drawImage(layout.getCanvas(), 0, 0);
        let frame = new Frame(canvas, delay, this.id++);
        let frameList = store.getState().multiplicate.frameList;
        frameList.push(frame);
        store.dispatch(changeFrameList(frameList));
    }

    static deleteFrame(index){
        let frameList =  store.getState().multiplicate.frameList;
        let currentFrame =  store.getState().multiplicate.currentFrame;


        frameList.splice(index, 1);
        store.dispatch(changeFrameList(frameList));
        if(frameList.length-1< currentFrame) store.dispatch(setCurrentFrame(frameList.length-1));
    }


    static renderRightPanel(){
        let frameList =  store.getState().multiplicate.frameList;
        store.dispatch(changeFrameList(frameList));
    }

    static swap(index1, index2){
        let frameList =  store.getState().multiplicate.frameList;

        if(index1<0 || index1 > frameList.length-1 || index2<0 || index2 > frameList.length-1) {
            return;
        }
        let help = frameList[index1];

        frameList[index1]=frameList[index2];
        frameList[index2]=help;

        this.renderRightPanel();
    }

    static playFilm(){
        let state = store.getState();
        let isPlaying = state.multiplicate.isPlaying;
        //Если уже идет фильм, то выходим из функции
        if(isPlaying) return;

        let frameList = state.multiplicate.frameList;
        if(state.multiplicate.currentFrame==frameList.length-1) store.dispatch(setCurrentFrame(0));
        store.dispatch(play());


        let currentFrameIndex = state.multiplicate.currentFrame;
        let modelFrameList = frameList.slice(currentFrameIndex);


        let promise = new Promise((resolve)=>{resolve()});
        modelFrameList.map((value, index) => {
            index = index + currentFrameIndex;
            promise = promise.then(()=>{
                return new Promise(resolve=>{
                    //не надо кидать другие кадры, в event loop если воспроизведение окончено
                    let isPlaying = store.getState().multiplicate.isPlaying;
                    if(!isPlaying){ resolve()};
                    setTimeout(() => {
                        //не надо рисовать после срабатывания таймаута, если нажали на паузу
                        let isPlaying = store.getState().multiplicate.isPlaying;
                        if(isPlaying){
                            store.dispatch(setCurrentFrame(index));
                            if(frameList.length-1 === index){
                                store.dispatch(stopPlay());
                            }
                            resolve();
                        }
                    }, value.getDelay());
                });
            });
        })
    }

    static pause(){
        store.dispatch(stopPlay());
    }

    static stop(){

    }

    static setDefaultDelay(){

    }

    static setCurrentFrame(index){
        store.dispatch(setCurrentFrame(index));
    }
    static getGif(){

    }



    static setMultiplicateCanvas(canvas){
        store.dispatch(setMultiplicateCanvas(canvas));
    }
}