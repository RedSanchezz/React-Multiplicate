import React from 'react';
import './FrameButtons.scss';
import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import {connect} from 'react-redux';
import {canPlay} from '../../../../../redux/actionCreators/multiplicateActionCreators';

function FrameButtons(props) {

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

export default connect(null, {canPlay: canPlay})(FrameButtons);