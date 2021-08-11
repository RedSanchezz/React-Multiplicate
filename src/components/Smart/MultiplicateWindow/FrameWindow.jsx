import React from 'react';
import FrameCanvasPanel from './FrameCanvasPanel/FrameCanvasPanel';
import FrameRightPanel from './FrameRightPanel/FrameRightPanel';
import FrameTopPanelContent from './FrameTopPanelContent/FrameTopPanelContent';
import TopPanel from '../../Dump/TopPanel/TopPanel';
import TopPanelMenu from '../TopPanelMenu/TopPanelMenu';
import RightPanel from '../../Dump/RightPanel/RightPanel';
import CenterSpace from '../../Dump/CenterSpace/CenterSpace';
import LeftPanel from '../../Dump/LeftPanel/LeftPanel';
import {compose} from 'redux';
import withRedirect from '../../../hoc/withRedirect';

function FrameWindow() {
    return (
        <div>
            <TopPanel>
                <TopPanelMenu></TopPanelMenu>
                <FrameTopPanelContent></FrameTopPanelContent>
            </TopPanel>

            <RightPanel>
                <FrameRightPanel></FrameRightPanel>
            </RightPanel>

            <CenterSpace>
                <FrameCanvasPanel></FrameCanvasPanel>
            </CenterSpace>
            <LeftPanel></LeftPanel>
        </div>
    );
}
export default compose(
    withRedirect
)(FrameWindow);

