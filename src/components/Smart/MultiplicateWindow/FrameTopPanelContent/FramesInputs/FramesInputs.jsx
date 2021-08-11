import React from 'react';
import {connect} from 'react-redux';
import './FramesInputs.scss';
import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import InputsBlock from '../../../../Dump/InputsBlock/InputsBlock';

function FramesInputs(props) {
    function changecurrentFrameIndex(e) {
        FrameManager.setСurrentFrameIndex(+e.target.value-1);
    }
    return (
        <div className='top-panel-inputs-block'>
            <InputsBlock title={'Фрэймы'}
                         onChange={changecurrentFrameIndex}
                         value={props.currentFrameIndex+1}
                         min='1'  max={props.frameList.length}
                         step='1'
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentFrameIndex: state.frames.currentFrameIndex,
        frameList: state.frames.frameList
    };
}

export default connect(mapStateToProps)(FramesInputs);