import React from 'react';
import FrameCanvasPanel from './FrameCanvasPanel/FrameCanvasPanel';
import FrameRightPanel from './FrameRightPanel/FrameRightPanel';
import FrameTopPanelContent from './FrameTopPanelContent/FrameTopPanelContent';
import TopPanel from '../../Dump/TopPanel/TopPanel';
import TopPanelMenu from '../TopPanelMenu/TopPanelMenu';
import RightPanel from '../../Dump/RightPanel/RightPanel';
import CenterSpace from '../../Dump/CenterSpace/CenterSpace';
import LeftPanel from '../../Dump/LeftPanel/LeftPanel';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

function FrameWindow(props) {
    if(!props.canvas) return <Redirect to='/draw'></Redirect>;
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

function mapStateToProps(state) {
    return {
        canvas: state.canvas.canvas
    }
}

export default connect(mapStateToProps)(FrameWindow);
