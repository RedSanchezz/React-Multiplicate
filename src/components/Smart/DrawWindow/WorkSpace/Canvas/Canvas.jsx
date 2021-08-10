import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setCanvas, setCanvasZoom} from '../../../../../redux/actionCreators/canvasActionCreator';
import store from '../../../../../redux/store';
import './Canvas.scss';

import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import LayoutManager from '../../../../../Managers/LayoutManager/LayoutManager';
import Layout from '../../../../../models/Layout';
import ListenerManager from '../../../../../utils/ListenerManager';
import ToolManager from '../../../../../Managers/ToolManager/ToolManager';

function Canvas(props) {

    let canvas = React.createRef();
    const setCanvas = props.setCanvas;
    //Когда компонент отрендерился, добавляем холст в state
    //биндим горячие клавиши
    useEffect(() => {
        let context = canvas.current.getContext('2d');
        setCanvas(canvas.current, context);

        let hotKeyListenerManager = new ListenerManager([]);
        addHotKeys(hotKeyListenerManager);


        return () => {
            hotKeyListenerManager.removeAllListener();
        };
    }, [canvas, setCanvas]);


    return (
        <React.Fragment>
            <canvas ref={canvas}
                    height={props.height} width={props.width}
                    className='canvas'
                    style={{
                        top: props.top,
                        left: props.left,
                        transform: `scale(${props.canvasZoom})`
                    }}
            >
            </canvas>
        </React.Fragment>
    );

}


function addHotKeys(listenerManager) {

    listenerManager.addListener(window ,'keydown', keyDown);
    function keyDown(e) {
        let state = store.getState();
        if (e.code === 'KeyS' && e.ctrlKey) {
            let canvas = store.getState().canvas.canvas;
            let context = store.getState().canvas.context;
            if (canvas != null) {
                let layout = new Layout(canvas, context, true, ++LayoutManager.id);
                FrameManager.addFrame(layout, 100);
            }
            e.preventDefault();
            return;
        }
        let layout = LayoutManager.getCurrentLayout();
        if (e.ctrlKey && e.code === 'KeyZ' && e.shiftKey) {
            layout.historyNext();
            e.preventDefault();
            return;
        }
        else if (e.ctrlKey && e.code === 'KeyZ') {
            layout.historyBack();
            e.preventDefault();
            return;
        }

        if(e.code === 'Digit1') {
            ToolManager.setTool('SCETCH_BRUSH');
            e.preventDefault();
            return;
        }
        if(e.code === 'Digit2') {
            ToolManager.setTool('ERASER');
            e.preventDefault();
            return;
        }
        if(e.code === 'Digit3') {
            ToolManager.setTool('HAND');
            e.preventDefault();
            return;
        }
        if(e.code === 'Digit4') {
            ToolManager.setTool('DRAG');
            e.preventDefault();
            return;
        }
        if(e.code === 'Digit5') {
            ToolManager.setTool('IMAGE');
            e.preventDefault();
            return;
        }
        e.preventDefault();
    }
    listenerManager.addListener(window ,'mousewheel', mouseWheeel);
    function mouseWheeel(e) {
        let canvasZoom = store.getState().canvas.zoom;
        if(e.deltaY>0) {
            if(+canvasZoom+0.1>5) return;
            store.dispatch(setCanvasZoom((+canvasZoom+0.1).toFixed(2)));
        }
        else if(e.deltaY<0) {
            if(+canvasZoom-0.1<=0) return;
            store.dispatch(setCanvasZoom((+canvasZoom-0.1).toFixed(2)));
        }

        // e.preventDefault();
    }
}

function mapStateToProps(state) {
    return {
        width: state.canvas.size.width,
        height: state.canvas.size.height,
        top: state.canvas.position.top,
        left: state.canvas.position.left,
        tmpCanvas: state.canvas.tmpCanvas,
        canvasZoom: state.canvas.zoom
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCanvas: bindActionCreators(setCanvas, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);


