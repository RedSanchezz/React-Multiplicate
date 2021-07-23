import React from 'react';
import {connect} from 'react-redux';
import './FramesInputs.scss';
import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import InputsBlock from '../../../../Dump/InputsBlock/InputsBlock';

function FramesInputs(props) {
    function changecurrentFrameIndex(e) {
        FrameManager.setcurrentFrameIndex(+e.target.value);
    }
    return (
        <div className='top-panel-inputs-block'>
            <InputsBlock title={'Фрэймы'}
                         onChange={changecurrentFrameIndex}
                         value={props.currentFrameIndex}
                         min='0'  max={props.frameList.length - 1}
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