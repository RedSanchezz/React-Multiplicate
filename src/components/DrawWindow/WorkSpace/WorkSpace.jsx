import React, { useEffect, useRef } from 'react'
import { bindActionCreators } from 'redux';

import './WorkSpace.scss'
import {changeCanvasSize, setCanvasBlock } from './../../../redux/actionCreators/canvasActionCreator';
import ToolManager from './../../../paint/ToolManager/ToolManager';
import LayoutManager from './../../../paint/LayoutManager/LayoutManager';
import Canvas from './Canvas/Canvas';
import { connect } from 'react-redux';




function WorkSpace(props) {

    const workSpace = useRef();

    //когда меняется канвас, инициализируем на работу с ним инструменты и слои
    useEffect(() => {
        console.log('first load canvas');
        let style = getComputedStyle(workSpace.current)
        props.changeCanvasSize(parseInt(style.width)-2, parseInt(style.height)-2);

        if(props.canvas!==null){
            //canvasBlock Нужен для корректной работы кисти. Это блок в котором находится canvas
            props.setCanvasBlock(workSpace.current);
            //устанавливаем кисть по умолчанию
            ToolManager.setTool(props.currentToolName);
            LayoutManager.init();
        }
    }, [props.canvas]);


    return (
        <div ref={workSpace} className='work-space' style={{backgroundColor: props.defaultBackgorund}}>
            <Canvas></Canvas>
        </div>
    )
}

function mapDispatchToProps(dispatch){
    return {
        changeCanvasSize: bindActionCreators(changeCanvasSize, dispatch),
        setCanvasBlock: bindActionCreators(setCanvasBlock, dispatch)
    }
}
function mapStateToProps(state){
    return {
        canvas: state.canvas.canvas,
        context: state.canvas.context,
        defaultBackgorund: state.setting.canvasDefaultBackground,
        currentLayout: state.layouts.currentLayout,
        currentToolName: state.canvas.currentToolName
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkSpace);