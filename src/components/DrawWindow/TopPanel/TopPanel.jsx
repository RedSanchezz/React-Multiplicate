

import React from 'react';
import { NavLink } from 'react-router-dom';
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
                <NavLink to='/createGif' className='top-panel__menu-item'>Save</NavLink>
                <NavLink to='/multiplicate' className='top-panel__menu-item'>Multiplicate</NavLink>
            </div>
            <ToolPanel></ToolPanel>
        </div>
    )
}
