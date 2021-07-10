import React  from 'react'
import { connect } from 'react-redux';
import ToolManager from '../../../Managers/ToolManager/ToolManager';
import './LeftPanel.scss';


function LeftPanel(props) {

    function setScetchBrushHandler(){
        ToolManager.setTool('SCETCH_BRUSH');
    }

    function setEraserHandler(){
        ToolManager.setTool('ERASER');
    }

    function setHandToolHandler(){
        ToolManager.setTool('HAND');
    }
    return (
        <div className='left-panel'>
            <div onClick={setScetchBrushHandler} 
                className={props.currentToolName==='SCETCH_BRUSH' ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/brush.svg" alt=""/>
            </div>

            <div onClick={setEraserHandler} 
                className={props.currentToolName=== 'ERASER' ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/eraser.svg" alt=""/>
            </div>
            <div onClick={setHandToolHandler} 
                className={props.currentToolName=== 'HAND' ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/eraser.svg" alt=""/>
            </div>
        </div>
    )
}


function mapStateToProps(state){
    return {
        currentToolName: state.canvas.currentToolName
    }
}

export default  connect(mapStateToProps)(LeftPanel);

