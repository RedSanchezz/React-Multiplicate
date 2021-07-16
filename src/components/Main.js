import React from 'react';
import {connect} from 'react-redux';

import './Main.scss';

import DrawWindow from './Smart/DrawWindow/DrawWindow';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import RedirectSec from './Smart/MultiplicateWindow/RedirectSec';
import GifSettingPanel from './Smart/gifSettingPanel/GifSettingPanel';
import store from '../redux/store';


function Main() {

    return (
        <BrowserRouter>
            <div className='main'>
                <Route path='/draw' render={() => <DrawWindow></DrawWindow>}></Route>
                <Route path='/multiplicate' render={() => <RedirectSec></RedirectSec>}></Route>
                <Route path='/createGif' render={() => <GifSettingPanel></GifSettingPanel>}></Route>
                <Redirect from='/' to='/draw'/>
            </div>
        </BrowserRouter>
    );
}




export default connect()(Main);