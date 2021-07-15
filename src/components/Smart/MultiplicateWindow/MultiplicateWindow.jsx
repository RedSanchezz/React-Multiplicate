import React from 'react';
import MultiplicateCanvasPanel from './MultiplicateCanvasPanel/MultiplicateCanvasPanel';
import MultiplicateLeftPanel from './MultiplicateLeftPanel/MultiplicateLeftPanel';
import MultiplicateRightPanel from './MultiplicateRightPanel/MultiplicateRightPanel';
import MultiplicateTopPanelContent from './MultiplicateTopPanelContent/MultiplicateTopPanelContent';
import TopPanel from '../../Dump/TopPanel/TopPanel';
import TopPanelMenu from '../../Dump/TopPanelMenu/TopPanelMenu';

export default function MultiplicateWindow() {
    return (
        <div>
            <TopPanel>
                <TopPanelMenu></TopPanelMenu>
                <MultiplicateTopPanelContent></MultiplicateTopPanelContent>
            </TopPanel>
            <MultiplicateRightPanel></MultiplicateRightPanel>
            <MultiplicateCanvasPanel></MultiplicateCanvasPanel>
            <MultiplicateLeftPanel></MultiplicateLeftPanel>
        </div>
    );
}

