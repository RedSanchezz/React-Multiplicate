import React from 'react'
import { connect } from 'react-redux';
import MultiplicateManager from '../../../../paint/MultiplicateManager/MultiplicateManager';


function MultiplicateFramesInputs(props) {
    
    function changeCurrentFrame(e){
        console.log(e.target.value);
        MultiplicateManager.setCurrentFrame(+e.target.value);
    }

    return (
        <div>
            <input onChange={changeCurrentFrame} value={props.currentFrame} type="number" min='0' max={props.frameList.length-1}  />
            <input onChange={changeCurrentFrame} value={props.currentFrame} type="range" min='0' max={props.frameList.length-1}  />
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