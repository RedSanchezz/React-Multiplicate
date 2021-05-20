
import React, { useState }  from 'react'
import { connect } from 'react-redux';
import ToolManager from '../../../paint/ToolManager/ToolManager';
import './LeftPanel.scss';
function LeftPanel() {

    let [activeTool, setActiveTool] = useState(0);

    function clickToolOneHandler(){
        ToolManager.setTool('SCETCH_BRUSH');
        console.log(activeTool);
        setActiveTool(0);
    }

    function clickToolTwoHandler(){
        ToolManager.setTool('ERASER');
        setActiveTool(1);
    }

    return (
        <div className='left-panel'>
            <div onClick={clickToolOneHandler} 
                className={activeTool===0 ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/brush.svg" alt=""/>
            </div>

            <div onClick={clickToolTwoHandler} 
                className={activeTool===1 ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/eraser.svg" alt=""/>
            </div>

            <div  className='left-panel__tool-item '>
                <img src="./img/brush.svg" alt=""/>
            </div>
            
            <div  className='left-panel__tool-item'>
                <img src="./img/eraser.svg" alt=""/>
            </div>
        </div>
    )
}


export default  connect()(LeftPanel);

