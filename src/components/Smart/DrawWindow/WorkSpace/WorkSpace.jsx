import React, {useEffect, useRef} from 'react';
import {bindActionCreators} from 'redux';

import './WorkSpace.scss';
import Canvas from './Canvas/Canvas';
import {connect} from 'react-redux';
import ToolManager from '../../../../Managers/ToolManager/ToolManager';
import LayoutManager from '../../../../Managers/LayoutManager/LayoutManager';
import {changeCanvasSize, setCanvasBlock} from '../../../../redux/actionCreators/canvasActionCreator';


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

    return (
        <div ref={workSpace} className='work-space' style={{backgroundColor: props.defaultBackgorund}}>
            <Canvas></Canvas>
        </div>
    );
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