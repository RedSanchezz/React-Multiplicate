import React from 'react';
import './SaveWindow.scss';
import TopPanel from '../../Dump/TopPanel/TopPanel';
import TopPanelMenu from '../TopPanelMenu/TopPanelMenu';
import SaveFormatTabs from './SaveFormatTabs/SaveFormatTabs';
import {Route} from 'react-router';
import LeftPanel from '../../Dump/LeftPanel/LeftPanel';
import RightPanel from '../../Dump/RightPanel/RightPanel';
import SaveGifPanel from './SaveGifPanel/SaveGifPanel';
import CenterSpace from '../../Dump/CenterSpace/CenterSpace';

function SaveWindow(props) {
    return (
        <div className='save-window'>
            <TopPanel>
                <TopPanelMenu></TopPanelMenu>
                <SaveFormatTabs></SaveFormatTabs>
            </TopPanel>
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>

            <CenterSpace>
                <Route path='/save/gif'>
                    <SaveGifPanel></SaveGifPanel>
                </Route>
                <Route path='/save/jpg'>
                    <div>JPG</div>
                </Route>
                <Route path='/save/png'>
                    <div>PNG</div>
                </Route>
            </CenterSpace>

        </div>
    );
}

export default SaveWindow;