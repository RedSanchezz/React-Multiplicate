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

    return (
        <>
            <div onClick={setScetchBrushHandler}
                 className={props.currentToolName === 'SCETCH_BRUSH' ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/brush.svg" alt=""/>
            </div>

            <div onClick={setEraserHandler}
                 className={props.currentToolName === 'ERASER' ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/eraser.svg" alt=""/>
            </div>
            <div onClick={setHandToolHandler}
                 className={props.currentToolName === 'HAND' ? 'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/hand.svg" alt=""/>
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
