import React from 'react';
import {connect} from 'react-redux';
import './MultiplicateFramesInputs.scss';
import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import InputsBlock from '../../../../Dump/InputsBlock/InputsBlock';

function MultiplicateFramesInputs(props) {
    function changeCurrentFrame(e) {
        FrameManager.setCurrentFrame(+e.target.value);
    }
    return (
        <div className='top-panel-inputs-block'>
            <InputsBlock title={'Фрэймы'}
                         onChange={changeCurrentFrame}
                         value={props.currentFrame}
                         min='0'  max={props.frameList.length - 1}
                         step='1'
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentFrame: state.multiplicate.currentFrame,
        frameList: state.multiplicate.frameList
    };
}

export default connect(mapStateToProps)(MultiplicateFramesInputs);