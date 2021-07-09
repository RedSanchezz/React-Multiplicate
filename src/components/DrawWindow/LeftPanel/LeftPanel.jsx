import React, { useState }  from 'react'
import { connect } from 'react-redux';

import './LeftPanel.scss';

import ToolManager from '../../../paint/ToolManager/ToolManager';

function LeftPanel() {

    let [activeTool, setActiveTool] = useState(0);

    function setScetchBrushHandler(){
        ToolManager.setTool('SCETCH_BRUSH');
        setActiveTool(0);
    }

    function setEraserHandler(){
        ToolManager.setTool('ERASER');
        setActiveTool(1);
    }

    return (
        <div className='left-panel'>
            <div onClick={setScetchBrushHandler} 
                className={activeTool===0 ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/brush.svg" alt=""/>
            </div>

            <div onClick={setEraserHandler} 
                className={activeTool===1 ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/eraser.svg" alt=""/>
            </div>
        </div>
    )
}


export default  connect()(LeftPanel);

