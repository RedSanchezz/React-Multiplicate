import React, { useState } from 'react'
import { connect } from 'react-redux';

import './Main.scss';
import DrawWindow from './DrawWindow/DrawWindow';
import { WindowContext } from './WindowContext';
import MultiplicateWindow from './MultiplicateWindow/MultiplicateWindow';



function Main (props){
    const [state, setState] = useState('draw');

    return (
        <WindowContext.Provider value={{
                window: state,
                changeWindow: setState
            }}>
            <div className='main'>
                {state==='draw' ? <DrawWindow></DrawWindow> : <MultiplicateWindow></MultiplicateWindow>}
            </div>
        </WindowContext.Provider>
    )
}



export default connect()(Main);