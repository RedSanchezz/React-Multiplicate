import React, { useContext } from 'react'
import { WindowContext } from '../../WindowContext'
import MultiplicateFrameButtons from './MultiplicateFrameButtons/MultiplicateFrameButtons';
import MultiplicateFramesInputs from './MultiplicateFramesInputs/MultiplicateFramesInputs';
import './MultiplicateTopPanel.scss';

export default function MultiplicateTopPanel() {
    
    let windowContext = useContext(WindowContext);

    function toDrawWindowhandler(){
        windowContext.changeWindow('draw');
    }



    return (
        <div className="top-panel multiplicate-top-panel">
            <div className='top-panel__menu'>
                <div className='top-panel__menu-item'>File</div>
                <div className='top-panel__menu-item'>Save</div>
                <div onClick={toDrawWindowhandler} className='top-panel__menu-item'>Draw</div>
            </div>
            <div className="top-panel-content">
                <MultiplicateFrameButtons></MultiplicateFrameButtons>
                <MultiplicateFramesInputs></MultiplicateFramesInputs>
            </div>
        </div>
    )
}
