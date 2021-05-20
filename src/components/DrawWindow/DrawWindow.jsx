

import React from 'react'
import TopPanel from './TopPanel/TopPanel'
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import WorkSpace from './WorkSpace/WorkSpace';

export default function DrawWindow() {
    return (
        <>
            <TopPanel></TopPanel>
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <WorkSpace></WorkSpace>
        </>
    )
}
