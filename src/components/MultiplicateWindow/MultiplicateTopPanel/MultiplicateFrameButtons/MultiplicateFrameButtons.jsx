
import React from 'react'
import MultiplicateManager from '../../../../paint/MultiplicateManager/MultiplicateManager';
import './MultiplicateFrameButtons.scss';

export default function MultiplicateFrameButtons() {

    function play(){
        MultiplicateManager.playFilm();
    }
    
    function pause(){
        MultiplicateManager.pause();
    }

    return (
            <div className="top-panel-buttons">
                <button className='pause-button' onClick={pause}></button>
                <button className='play-button'  onClick={play}></button>
                <button className='stop-button'></button>
            </div>
    )
}
