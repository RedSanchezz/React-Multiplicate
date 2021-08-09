import React from 'react';
import {connect} from 'react-redux';

import './App.scss';

import DrawWindow from './Smart/DrawWindow/DrawWindow';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import RedirectSec from './Smart/MultiplicateWindow/RedirectSec';
import SaveWindow from './Smart/SaveWindow/SaveWindow';

function App() {
    return (
        <BrowserRouter>
            <div className='main'>
                <Switch>
                    <Route path='/draw' render={() => <DrawWindow></DrawWindow>}></Route>
                    <Route path='/draw' render={() => <DrawWindow></DrawWindow>}></Route>
                    <Route path='/frames' render={() => <RedirectSec></RedirectSec>}></Route>
                    <Route path='/save' render={() => <SaveWindow></SaveWindow>}></Route>
                    <Redirect from='/'  to='/draw'/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}




export default connect()(App);