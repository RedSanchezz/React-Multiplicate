import React, { useState } from 'react'
import { connect } from 'react-redux';

import './Main.scss';

import DrawWindow from './DrawWindow/DrawWindow';
import MultiplicateWindow from './MultiplicateWindow/MultiplicateWindow';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';


function Main (){
    
    return (
        <BrowserRouter>
            <div className='main'>
                <Route path='/draw' render={()=><DrawWindow></DrawWindow>}></Route>
                <Route path='/multiplicate' render={()=><MultiplicateWindow></MultiplicateWindow>}></Route>
                <Redirect from='/' to='/draw'/>
            </div>
        </BrowserRouter>
    )
}



export default connect()(Main);