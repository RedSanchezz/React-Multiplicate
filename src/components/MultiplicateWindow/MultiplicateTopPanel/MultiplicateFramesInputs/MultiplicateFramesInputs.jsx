import React from 'react'
import { connect } from 'react-redux';
import './MultiplicateFramesInputs.scss';
import FrameManager from './../../../../Managers/FrameManager/FrameManager';

function MultiplicateFramesInputs(props) {
    function changeCurrentFrame(e){
        FrameManager.setCurrentFrame(+e.target.value);
    }

    return (
        <div className='top-panel-inputs-block'>
            <span>Фреймы</span>
            <div className='top-panel-inputs'>
                <input onChange={changeCurrentFrame} value={props.currentFrame} type="number" min='0' max={props.frameList.length-1}  />
                <input onChange={changeCurrentFrame} value={props.currentFrame} type="range" min='0' max={props.frameList.length-1}  />
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        currentFrame: state.multiplicate.currentFrame,
        frameList: state.multiplicate.frameList
    }
}

export default connect(mapStateToProps)(MultiplicateFramesInputs);