import React from 'react';
import {connect} from 'react-redux';

import './App.scss';

import DrawWindow from './Smart/DrawWindow/DrawWindow';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import SaveWindow from './Smart/SaveWindow/SaveWindow';
import FrameWindow from './Smart/MultiplicateWindow/FrameWindow';

function App() {
    return (
        <BrowserRouter>
            <div className='main'>
                <Switch>
                    <Route path='/draw' render={() => <DrawWindow/>}/>
                    <Route path='/frames' render={() =><FrameWindow/>}/>
                    <Route path='/save' render={() => <SaveWindow/>}/>
                    <Redirect from='/'  to='/draw'/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}




export default connect()(App);