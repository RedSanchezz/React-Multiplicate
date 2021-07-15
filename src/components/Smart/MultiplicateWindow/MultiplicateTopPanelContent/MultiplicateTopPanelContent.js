import React from 'react';
import MultiplicateFrameButtons from './MultiplicateFrameButtons/MultiplicateFrameButtons';
import MultiplicateFramesInputs from './MultiplicateFramesInputs/MultiplicateFramesInputs';
import './MultiplicateTopPanelContent.scss';

export default function MultiplicateTopPanelContent() {

    return (
        <>
            <div className="top-panel-content">
                <MultiplicateFrameButtons></MultiplicateFrameButtons>
                <MultiplicateFramesInputs></MultiplicateFramesInputs>
            </div>
        </>
    );
}
