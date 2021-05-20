import React, { useEffect, useRef } from 'react'
import { bindActionCreators } from 'redux';

import './WorkSpace.scss'
import setToolManager, { changeCanvasSize } from './../../../redux/actionCreators/canvasActionCreator';
import { addLayoutManager } from './../../../redux/actionCreators/layoutActionCreator';
import ToolManager from './../../../paint/ToolManager/ToolManager';
import LayoutManager from './../../../paint/LayoutManager/LayoutManager';
import Canvas from './Canvas/Canvas';
import { connect } from 'react-redux';




function WorkSpace(props) {

    const workSpace = useRef();

    useEffect(() => {
        let style = getComputedStyle(workSpace.current)
        props.changeCanvasSize(parseInt(style.width)-2, parseInt(style.height)-2);
    }, []);


    useEffect(() => {
        let style = getComputedStyle(workSpace.current)
        props.changeCanvasSize(parseInt(style.width)-2, parseInt(style.height)-2);
        if(props.canvas!==null){
            let toolManager = new ToolManager(props.canvas, props.context, workSpace.current);
            toolManager.setTool();
            props.setToolManager(toolManager);
            let layoutManager = new LayoutManager();
            props.addLayoutManager(layoutManager);
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
        setToolManager: bindActionCreators(setToolManager, dispatch),
        addLayoutManager: bindActionCreators(addLayoutManager, dispatch)
    }
}
function mapStateToProps(state){
    return {
        toolManager: state.canvas.toolManager,
        canvas: state.canvas.canvas,
        context: state.canvas.context,
        defaultBackgorund: state.setting.canvasDefaultBackground,
        currentLayout: state.layouts.currentLayout,
        forRender: state.layouts

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkSpace);