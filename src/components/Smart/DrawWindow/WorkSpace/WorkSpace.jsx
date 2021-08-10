import React, {useEffect, useRef} from 'react';
import {bindActionCreators} from 'redux';

import './WorkSpace.scss';
import Canvas from './Canvas/Canvas';
import {connect} from 'react-redux';
import ToolManager from '../../../../Managers/ToolManager/ToolManager';
import LayoutManager from '../../../../Managers/LayoutManager/LayoutManager';
import {changeCanvasSize, setCanvasBlock, setCanvasZoom} from '../../../../redux/actionCreators/canvasActionCreator';
import store from '../../../../redux/store';
import Layout from '../../../../models/Layout';
import FrameManager from '../../../../Managers/FrameManager/FrameManager';
import ListenerManager from '../../../../utils/ListenerManager';


function WorkSpace(props) {

    const canvas = props.canvas;
    const workSpace = useRef();

    const changeCanvasSize =  props.changeCanvasSize;
    const currentToolName = props.currentToolName;
    const setCanvasBlock = props.setCanvasBlock;

    //когда меняется холст, инициализируем на работу с ним инструменты и слои
    useEffect(() => {
        let style = getComputedStyle(workSpace.current);
        changeCanvasSize(parseInt(style.width) - 2, parseInt(style.height) - 2);

        if (canvas !== null) {
            //canvasBlock Нужен для корректной работы кисти. Это блок в котором находится canvas
            setCanvasBlock(workSpace.current);
            //устанавливаем кисть по умолчанию
            ToolManager.setTool(currentToolName);
            LayoutManager.init();
        }
    }, [canvas, changeCanvasSize, currentToolName, setCanvasBlock]);

    //устанавливаем горячие клавиши1
    useEffect(()=>{
        let hotKeyListenerManager = new ListenerManager([]);
        addHotKeys(hotKeyListenerManager, workSpace.current);
        return ()=>{
            hotKeyListenerManager.removeAllListener();
        }
    }, []);


    return (
        <div ref={workSpace} className='work-space' style={{backgroundColor: props.defaultBackgorund}}>
            <Canvas></Canvas>
        </div>
    );
}

function addHotKeys(listenerManager, workSpace) {

    listenerManager.addListener(window ,'keydown', keyDown);
    function keyDown(e) {
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
            ToolManager.setTool(ToolManager.SKETCH_BRUSH);
            e.preventDefault();
            return;
        }
        if(e.code === 'Digit2') {
            ToolManager.setTool(ToolManager.ERASER);
            e.preventDefault();
            return;
        }
        if(e.code === 'Digit3') {
            ToolManager.setTool(ToolManager.HAND);
            e.preventDefault();
            return;
        }
        if(e.code === 'Digit4') {
            ToolManager.setTool(ToolManager.DRAG);
            e.preventDefault();
            return;
        }
        if(e.code === 'Digit5') {
            ToolManager.setTool(ToolManager.IMAGE);
            e.preventDefault();
            return;
        }

        if(e.code === 'ArrowDown') {
            LayoutManager.setCurrentLayout(LayoutManager.getCurrentLayoutIndex()+1);
            e.preventDefault();
            return;
        }
        if(e.code === 'ArrowUp') {
            LayoutManager.setCurrentLayout(LayoutManager.getCurrentLayoutIndex()-1);
            e.preventDefault();
            return;
        }

        if(e.code === 'ArrowLeft') {
            let currentLayout = LayoutManager.getCurrentLayout();
            currentLayout.historyBack();
            e.preventDefault();
            return;
        }

        if(e.code === 'ArrowRight') {
            let currentLayout = LayoutManager.getCurrentLayout();
            currentLayout.historyNext();
            e.preventDefault();
            return;
        }

        if(e.code === 'KeyH') {
            LayoutManager.toggleHide(LayoutManager.getCurrentLayoutIndex());
            e.preventDefault();
            return;
        }
    }

    listenerManager.addListener(workSpace ,'mousewheel', mouseWheel);
    function mouseWheel(e) {
        let canvasZoom = store.getState().canvas.zoom;
        if(e.deltaY>0) {
            if(+canvasZoom+0.1>5) return;
            store.dispatch(setCanvasZoom((+canvasZoom+0.1).toFixed(2)));
        }
        else if(e.deltaY<0) {
            if(+canvasZoom-0.1<=0) return;
            store.dispatch(setCanvasZoom((+canvasZoom-0.1).toFixed(2)));
        }
    }
}



function mapDispatchToProps(dispatch) {
    return {
        changeCanvasSize: bindActionCreators(changeCanvasSize, dispatch),
        setCanvasBlock: bindActionCreators(setCanvasBlock, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        canvas: state.canvas.canvas,
        context: state.canvas.context,
        defaultBackgorund: state.setting.canvasDefaultBackground,
        currentLayout: state.layouts.currentLayout,
        currentToolName: state.canvas.currentToolName
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkSpace);