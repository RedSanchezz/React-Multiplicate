import React from 'react';
import {connect} from 'react-redux';
import ToolManager from '../../../../Managers/ToolManager/ToolManager';
import './ToolList.scss';


function ToolList(props) {

    function setSketchBrushHandler() {
        ToolManager.setTool(ToolManager.SKETCH_BRUSH);
    }
    function setEraserHandler() {
        ToolManager.setTool(ToolManager.ERASER);
    }

    function setHandToolHandler() {
        ToolManager.setTool(ToolManager.HAND);
    }
    function setDragToolHandler() {
        ToolManager.setTool(ToolManager.DRAG);
    }
    function setImageToolHandler() {
        ToolManager.setTool(ToolManager.IMAGE);
    }

    return (
        <>
            <div onClick={setSketchBrushHandler}
                 className={props.currentToolName === ToolManager.SKETCH_BRUSH ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/brush.svg" } alt=""/>
            </div>
            <div onClick={setEraserHandler}
                 className={props.currentToolName === ToolManager.ERASER ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/eraser.svg"} alt=""/>
            </div>
            <div onClick={setHandToolHandler}
                 className={props.currentToolName === ToolManager.HAND ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/hand.svg"} alt=""/>
            </div>
            <div onClick={setDragToolHandler}
                 className={props.currentToolName === ToolManager.DRAG ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/selection.svg"} alt=""/>
            </div>
            <div onClick={setImageToolHandler}
                 className={props.currentToolName === ToolManager.IMAGE ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/picture.svg"} alt=""/>
            </div>
        </>
    );
}


function mapStateToProps(state) {
    return {
        currentToolName: state.canvas.currentToolName
    };
}

export default connect(mapStateToProps)(ToolList);

