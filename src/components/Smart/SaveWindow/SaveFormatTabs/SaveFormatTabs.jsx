import React from 'react';
import './SaveFormatTabs.scss';
import {NavLink} from 'react-router-dom';

function SaveFormatTabs(props) {
    return (
        <div className='top-panel__save-tabs save-tabs'>
            <NavLink to='/save/gif' className = 'save-tabs__item'>Gif</NavLink>
            <NavLink to='/save/image' className = 'save-tabs__item'>Image</NavLink>
        </div>
    );
}

export default SaveFormatTabs;