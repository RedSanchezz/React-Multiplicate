import React from 'react';
import FrameButtons from './FrameButtons/FrameButtons';
import FramesInputs from './FramesInputs/FramesInputs';
import './FrameTopPanelContent.scss';

export default function FrameTopPanelContent() {
    return (
        <>
            <div className="top-panel-content">
                <FrameButtons></FrameButtons>
                <FramesInputs></FramesInputs>
            </div>
        </>
    );
}
