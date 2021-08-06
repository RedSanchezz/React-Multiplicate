import React from 'react';
import {connect} from 'react-redux';
import ToolManager from '../../../../Managers/ToolManager/ToolManager';
import './ToolList.scss';


function ToolList(props) {

    function setScetchBrushHandler() {
        ToolManager.setTool('SCETCH_BRUSH');
    }
    function setEraserHandler() {
        ToolManager.setTool('ERASER');
    }

    function setHandToolHandler() {
        ToolManager.setTool('HAND');
    }
    function setDragToolHandler() {
        ToolManager.setTool('DRAG');
    }
    function setImageToolHandler() {
        ToolManager.setTool('IMAGE');
    }

    return (
        <>
            <div onClick={setScetchBrushHandler}
                 className={props.currentToolName === 'SCETCH_BRUSH' ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/brush.svg" } alt=""/>
            </div>
            <div onClick={setEraserHandler}
                 className={props.currentToolName === 'ERASER' ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/eraser.svg"} alt=""/>
            </div>
            <div onClick={setHandToolHandler}
                 className={props.currentToolName === 'HAND' ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/hand.svg"} alt=""/>
            </div>
            <div onClick={setDragToolHandler}
                 className={props.currentToolName === 'DRAG' ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src={process.env.PUBLIC_URL + "/img/selection.svg"} alt=""/>
            </div>
            <div onClick={setImageToolHandler}
                 className={props.currentToolName === 'IMAGE' ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
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

