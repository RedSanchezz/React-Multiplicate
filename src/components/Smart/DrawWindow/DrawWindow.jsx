import React from 'react';
import WorkSpace from './WorkSpace/WorkSpace';
import TopPanel from '../../Dump/TopPanel/TopPanel';
import TopPanelMenu from '../TopPanelMenu/TopPanelMenu';
import ToolPanel from './ToolSettingPanel/ToolSettingPanel';
import LeftPanel from '../../Dump/LeftPanel/LeftPanel';
import ToolList from './ToolList/ToolList';
import RightPanel from '../../Dump/RightPanel/RightPanel';
import RightPanelContent from './RightPanelContent/RightPanelContent';

export default function DrawWindow() {
    return (
        <>
            <TopPanel>
                <TopPanelMenu></TopPanelMenu>
                <ToolPanel></ToolPanel>
            </TopPanel>
            <LeftPanel>
                <ToolList></ToolList>
            </LeftPanel>
            <RightPanel>
                <RightPanelContent></RightPanelContent>
            </RightPanel>
            <WorkSpace></WorkSpace>
        </>
    );
}
