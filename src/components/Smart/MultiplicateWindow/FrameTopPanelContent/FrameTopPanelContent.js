import React from 'react';
import MultiplicateFrameButtons from './FrameButtons/FrameButtons';
import MultiplicateFramesInputs from './FramesInputs/FramesInputs';
import './FrameTopPanelContent.scss';

export default function FrameTopPanelContent() {

    return (
        <>
            <div className="top-panel-content">
                <MultiplicateFrameButtons></MultiplicateFrameButtons>
                <MultiplicateFramesInputs></MultiplicateFramesInputs>
            </div>
        </>
    );
}
