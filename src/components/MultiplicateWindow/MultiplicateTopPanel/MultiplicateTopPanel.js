import React from 'react'
import { NavLink } from 'react-router-dom';
import MultiplicateFrameButtons from './MultiplicateFrameButtons/MultiplicateFrameButtons';
import MultiplicateFramesInputs from './MultiplicateFramesInputs/MultiplicateFramesInputs';
import './MultiplicateTopPanel.scss';

export default function MultiplicateTopPanel() {
    
    return (
        <div className="top-panel multiplicate-top-panel">
            <div className='top-panel__menu'>
                <div className='top-panel__menu-item'>File</div>
                <NavLink to='/createGif' className='top-panel__menu-item'>Save</NavLink>
                <NavLink to='/draw' className='top-panel__menu-item'>Draw</NavLink>
            </div>
            <div className="top-panel-content">
                <MultiplicateFrameButtons></MultiplicateFrameButtons>
                <MultiplicateFramesInputs></MultiplicateFramesInputs>
            </div>
        </div>
    )
}
