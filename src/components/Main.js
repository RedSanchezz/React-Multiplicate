import React, { useState } from 'react'
import { connect } from 'react-redux';

import './Main.scss';

import DrawWindow from './DrawWindow/DrawWindow';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import RedirectSec from './MultiplicateWindow/RedirectSec';
import GifSettingPanel from './gifSettingPanel/GifSettingPanel';


function Main (){
    
    return (
        <BrowserRouter>
            <div className='main'>
                <Route path='/draw' render={()=><DrawWindow></DrawWindow>}></Route>
                <Route path='/multiplicate' render={()=><RedirectSec></RedirectSec>}></Route>
                <Route path='/createGif' render={()=> <GifSettingPanel></GifSettingPanel>}></Route>

                <Redirect from='/' to='/draw'/>
            </div>
        </BrowserRouter>
    )
}



export default connect()(Main);