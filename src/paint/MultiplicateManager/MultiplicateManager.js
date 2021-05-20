import { changeFrameList } from "../../redux/actionCreators/multiplicateActionCreators";
import store from "../../redux/store";


export default class MultiplicateManager {
    constructor(){
    }

    static addFrame(layout, delay){
        console.log(layout.getContext());
        let canvas = document.createElement('canvas');
        
        canvas.width=layout.getCanvas().width;
        canvas.height=layout.getCanvas().height;
        canvas.getContext('2d').drawImage(layout.getCanvas(), 0, 0);
        let frame = {
            canvas: canvas,
            delay: delay
        }

        let frameList =  store.getState().multiplicate.frameList;
        frameList.push(frame);
        store.dispatch(changeFrameList(frameList));
    }

    static deleteFrame(index){
        let frameList =  store.getState().multiplicate.frameList;
        console.log(frameList.length);

        frameList.splice(index, 1);
        console.log(frameList.length);
        store.dispatch(changeFrameList(frameList));
    }
    static renderRightPanel(){
        let frameList =  store.getState().multiplicate.frameList;
        store.dispatch(changeFrameList(frameList));
    }
    static swap(index1, index2){
        let state = store.getState();
        let frameList =  store.getState().multiplicate.frameList;

        if(index1<0 || index1 > frameList.length-1 || index2<0 || index2 > frameList.length-1) {
            return;
        }

        let help = frameList[index1];
        frameList[index1]=frameList[index2];
        frameList[index2]=help;


        this.renderRightPanel();
    }

}