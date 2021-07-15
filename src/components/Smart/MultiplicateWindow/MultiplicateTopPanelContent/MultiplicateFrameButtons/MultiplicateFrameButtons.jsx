import React from 'react';
import './MultiplicateFrameButtons.scss';
import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import {connect} from 'react-redux';
import {canPlay} from '../../../../../redux/actionCreators/multiplicateActionCreators';

function MultiplicateFrameButtons(props) {

    function play() {
        props.canPlay();
        FrameManager.playFilm();
    }

    function pause() {
        FrameManager.pause();
    }

    return (
        <div className="top-panel-buttons">
            <button className='pause-button' onClick={pause}></button>
            <button className='play-button' onClick={play}></button>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        stopedPlaying: state.multiplicate.stopPlay
    }
}
export default connect(null, {canPlay: canPlay})(MultiplicateFrameButtons);