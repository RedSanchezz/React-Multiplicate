

import React from 'react';
import ToolPanel from './ToolPanel/ToolPanel';
import './TopPanel.scss';


export default function TopPanel() {
    return (
        <div className='top-panel'>
            <div className="top-panel__logo">
                {/* <img src="/img/test-logo.jpg" alt=""/> */}
            </div>
            <div className='top-panel__menu'>
                    <div className='top-panel__menu-item'>File</div>
                    <div className='top-panel__menu-item'>Save</div>
                    <div className='top-panel__menu-item'>Multiplicate</div>
            </div>
            <ToolPanel></ToolPanel>
        </div>
    )
}
