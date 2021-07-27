import {
    canPlay,
    changeFrameList,
    setСurrentFrameIndex,
    setMultiplicateCanvas,
    stopPlay
} from '../../redux/actionCreators/multiplicateActionCreators';

import store from '../../redux/store';
import Frame from '../../models/Frame';
import GIF from 'gif.js';
//Прослойка для работы с фреймами

export default class FrameManager {
    static id = 0;

    constructor() {
    }

    static addFrame(layout, delay) {
        let state = store.getState();
        let stopPlay = state.frames.stopPlay;
        if(!stopPlay) return;

        let canvas = document.createElement('canvas');
        let currentFrameIndex =state.frames.currentFrameIndex;
        let frameList = state.frames.frameList;

        // if (frameList.length > 120) {
        //     alert('Общее количество фреймов не должно превышать 120');
        //     return;
        //
        // }
        canvas.width = layout.getCanvas().width;
        canvas.height = layout.getCanvas().height;
        canvas.getContext('2d').drawImage(layout.getCanvas(), 0, 0);

        let frame = new Frame(canvas, delay, this.id++);


        frameList.push(frame);
        store.dispatch(changeFrameList(frameList));

        if (currentFrameIndex === -1) store.dispatch(setСurrentFrameIndex(0));
    }

    static setDelaySelectedFrames(delay){

        let state = store.getState();
        let frameList = state.frames.frameList;

        frameList.forEach((frame, index)=>{
            if(frame.isSelected()){
                frame.setDelay(delay);
            }
        });
        store.dispatch(changeFrameList(frameList));
    }
    static deleteSelectedFrame(){
        let state = store.getState();
        let frameList = state.frames.frameList;
        let newFrameList = frameList.filter((frame, index)=>!frame.isSelected());
        console.log(newFrameList);
        store.dispatch(changeFrameList(newFrameList));
        store.dispatch(setСurrentFrameIndex(newFrameList.length-1));

    }

    static unSelectAllFrame(){
        let state = store.getState();
        let frameList = state.frames.frameList;
        frameList.forEach((frame, index)=>{
            if(frame.isSelected()){
                frame.unSelect();
            }
        });
        store.dispatch(changeFrameList(frameList));
    }
    static changeFrame() {
        console.log('ok wce good');
        let state = store.getState();
        let stopPlay = state.frames.stopPlay;

        let frameList = state.frames.frameList;
        store.dispatch(changeFrameList(frameList));
    }

    static deleteFrame(index) {
        let state = store.getState();
        let stopPlay = state.frames.stopPlay;
        if(!stopPlay) return;
        let frameList = state.frames.frameList;
        let currentFrameIndex = state.frames.currentFrameIndex;

        frameList.splice(index, 1);

        if (frameList.length - 1 < currentFrameIndex) store.dispatch(setСurrentFrameIndex(frameList.length - 1));

        store.dispatch(changeFrameList(frameList));
    }

    static openCloseFrame(frame){
        if (frame.isOpen()) frame.close();
        else frame.open();
        let frameList = store.getState().frames.frameList;
        store.dispatch(changeFrameList(frameList));
    }

    static swap(index1, index2) {
        let state = store.getState();
        let stopPlay = state.frames.stopPlay;
        if(!stopPlay) return;
        let frameList = state.frames.frameList;

        if (index1 < 0 || index1 > frameList.length - 1 || index2 < 0 || index2 > frameList.length - 1) {
            return;
        }
        let help = frameList[index1];

        frameList[index1] = frameList[index2];
        frameList[index2] = help;

        store.dispatch(changeFrameList(frameList));
    }

    static save() {
        console.log('if playing ');
        let state = store.getState();
        let gif = new GIF({
            workers: 2,
            quality: 10
        });
        state.frames.frameList.map((frame) => {
            gif.addFrame(frame.getCanvas(), {delay: frame.getDelay()});
        });

        gif.on('finished', function (blob) {
            console.log('check !');
            window.open(URL.createObjectURL(blob));
        });
        gif.render();
    }

    static playFilm() {
        console.log('playFilm');
        let state = store.getState();
        let frameList = state.frames.frameList;
        if(frameList.length===0) {
            if(frameList.length ===0) {
                alert('Список фреймов пуст !');
                return;
            }
        }

        //Если нажали на паузу - выходим из функции
        let currentFrameIndex = state.frames.currentFrameIndex;

        let currentFrame = frameList[currentFrameIndex];

        currentFrame.getDelay();

        setTimeout(() => {
            let state = store.getState();
            let stopPlay = state.frames.stopPlay;
            currentFrameIndex = state.frames.currentFrameIndex;
            if (stopPlay) {
                return;
            }

            if (frameList.length - 1 != currentFrameIndex) {
                store.dispatch(setСurrentFrameIndex(++currentFrameIndex));
                this.playFilm();
            } else {
                this.pause();
                return;
            }
        }, currentFrame.getDelay());
    }

    static pause() {
        store.dispatch(stopPlay());
    }

    static stop() {
        store.dispatch(stopPlay());
        setСurrentFrameIndex(0);
    }

    static setСurrentFrameIndex(index) {
        store.dispatch(setСurrentFrameIndex(index));
    }

    static setMultiplicateCanvas(canvas) {
        store.dispatch(setMultiplicateCanvas(canvas));
    }

    static setDelayToAll(delay) {
        let state = store.getState();
        let frameList = state.frames.frameList;
        frameList.map((frame, index) => {
            frame.setDelay(delay);
        });
        store.dispatch(changeFrameList(frameList));
    }
}