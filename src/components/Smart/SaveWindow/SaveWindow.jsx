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
import withRedirect from '../../../hoc/withRedirect';
import SaveJpgPanel from './SaveImagePanel/SaveImagePanel';

function SaveWindow(props) {
    return (
        <div className='save-window'>
            <TopPanel>
                <TopPanelMenu/>
                <SaveFormatTabs/>
            </TopPanel>
            <LeftPanel/>
            <RightPanel/>
            <CenterSpace>
                <Route path='/save/gif'>
                    <SaveGifPanel/>
                </Route>
                <Route path='/save/image'>
                    <SaveJpgPanel/>
                </Route>
                <Route exact path='/save'>
                    <div className='save-window__file-type-title'><h1>Выберите тип файла</h1></div>
                </Route>
            </CenterSpace>
        </div>
    );
}

export default withRedirect(SaveWindow);