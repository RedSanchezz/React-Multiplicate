
import React, { useState }  from 'react'
import { connect } from 'react-redux';
import './LeftPanel.scss';
function LeftPanel(props) {

    let [activeTool, setActiveTool] = useState(0);

    function clickToolOneHandler(){
        props.toolManager.setTool('SCETCH_BRUSH');
        console.log(activeTool);
        setActiveTool(0);
    }

    function clickToolTwoHandler(){
        props.toolManager.setTool('ERASER');
        setActiveTool(1);
    }

    return (
        <div className='left-panel'>
            <div onClick={clickToolOneHandler} 
                className={activeTool==0 ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
                <img src="./img/brush.svg" alt=""/>
            </div>
            <div onClick={clickToolTwoHandler} 
                className={activeTool==1 ?   'left-panel__tool-item active' : 'left-panel__tool-item'}>
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

function mapStateToProps(state){
    return {
        toolManager: state.canvas.toolManager,
    }
}

export default  connect(mapStateToProps)(LeftPanel);

