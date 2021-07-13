import { canPlay, changeFrameList, setCurrentFrame, setMultiplicateCanvas, stopPlay } from "../../redux/actionCreators/multiplicateActionCreators";

import store from "../../redux/store";
import Frame from "../../models/Frame";

//Прослойка для работы с фреймами

export default class FrameManager {
    constructor(){
    }
    static id=0;
    
    static addFrame(layout, delay){
        let canvas = document.createElement('canvas');
        let currentFrame =  store.getState().multiplicate.currentFrame;

        canvas.width=layout.getCanvas().width;
        canvas.height=layout.getCanvas().height;
        canvas.getContext('2d').drawImage(layout.getCanvas(), 0, 0);

        let frame = new Frame(canvas, delay, this.id++);
        let frameList = store.getState().multiplicate.frameList;
        frameList.push(frame);
        store.dispatch(changeFrameList(frameList));

        if(currentFrame===-1) store.dispatch(setCurrentFrame(0));
    }

    static changeFrame(){
        let frameList =  store.getState().multiplicate.frameList;
        store.dispatch(changeFrameList(frameList));
    }

    static deleteFrame(index){
        let frameList =  store.getState().multiplicate.frameList;
        let currentFrame =  store.getState().multiplicate.currentFrame;

        frameList.splice(index, 1);
        store.dispatch(changeFrameList(frameList));
        if(frameList.length-1< currentFrame) store.dispatch(setCurrentFrame(frameList.length-1));
    }

    static renderAllFrame(){
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

        this.renderAllFrame();
    }

    static playFilm(){
        let state = store.getState();
        let stopPlay = state.multiplicate.stopPlay;
        //Если нажали на паузу - выходим из функции
        if(stopPlay) {
            store.dispatch(canPlay());
            return;
        }

        let frameList = state.multiplicate.frameList;
        let currentFrameIndex = state.multiplicate.currentFrame;

        let currentFrame = frameList[currentFrameIndex];

        currentFrame.getDelay();
        setTimeout(() => {
            let state = store.getState();
            currentFrameIndex = state.multiplicate.currentFrame;
            let stopPlay = state.multiplicate.stopPlay;
            if(stopPlay) {
                store.dispatch(canPlay());
                return;
            }

            if(frameList.length-1 != currentFrameIndex){
                store.dispatch(setCurrentFrame(++currentFrameIndex));
                this.playFilm();
            }
            else {
                return;
            }
        }, currentFrame.getDelay());

        
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

    static setMultiplicateCanvas(canvas){
        store.dispatch(setMultiplicateCanvas(canvas));
    }

    static setDelayToAll(delay){
        let state = store.getState();
        let frameList = state.multiplicate.frameList;
        frameList.map((frame, index) => {
            frame.setDelay(delay);
        });
        store.dispatch(changeFrameList(frameList));
    }
}