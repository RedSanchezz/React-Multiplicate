import React, { useContext } from 'react'
import { WindowContext } from '../../WindowContext'
import MultiplicateManager from './../../../paint/MultiplicateManager/MultiplicateManager';
import MultiplicateFramesInputs from './MultiplicateFramesInputs/MultiplicateFramesInputs';

export default function MultiplicateTopPanel() {
    
    let windowContext = useContext(WindowContext);

    function toDrawWindowhandler(){
        windowContext.changeWindow('draw');
    }

    function play(){
        MultiplicateManager.playFilm();
    }
    
    function pause(){
        MultiplicateManager.pause();
    }

    return (
        <div  className="top-panel">
            <button onClick={toDrawWindowhandler}>Назад</button>
            <button onClick={play}>Play !</button>
            <button onClick={pause}>Pause !</button>
            <MultiplicateFramesInputs></MultiplicateFramesInputs>
        </div>
    )
}
