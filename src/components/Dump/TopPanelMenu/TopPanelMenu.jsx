import React from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import './TopPanelMenu.scss';

export default function TopPanelMenu(props) {

    let location = useLocation();
    console.log(location);

    return (
        <div className='top-panel__menu'>
            <div className='top-panel__menu-item'>File</div>
            <NavLink to='/createGif' className='top-panel__menu-item'>Save</NavLink>
            <NavLink to='/draw' className='top-panel__menu-item'>draw</NavLink>
            <NavLink to='/multiplicate' className='top-panel__menu-item'>mult</NavLink>
        </div>
    );
}
