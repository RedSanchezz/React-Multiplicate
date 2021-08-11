import React from 'react';
import Frames from '../../DrawWindow/RightPanelContent/Frames/Frames';
import './FrameRightPanel.scss';
export default function FrameRightPanel() {

    return (
        <>
            <div className='right-panel__top-block'>
                <h2>Список кадров</h2>
            </div>
            <Frames></Frames>
        </>
    );
}