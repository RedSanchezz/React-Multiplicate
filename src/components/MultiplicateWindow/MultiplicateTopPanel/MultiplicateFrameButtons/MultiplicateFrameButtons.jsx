
import React from 'react'
import './MultiplicateFrameButtons.scss';
import FrameManager from './../../../../Managers/FrameManager/FrameManager';

export default function MultiplicateFrameButtons() {

    function play(){
        FrameManager.playFilm();
    }
    
    function pause(){
        FrameManager.pause();
    }

    return (
            <div className="top-panel-buttons">
                <button className='pause-button' onClick={pause}></button>
                <button className='play-button'  onClick={play}></button>
            </div>
    )
}
