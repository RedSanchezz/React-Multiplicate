import React from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import './TopPanelMenu.scss';

export default function TopPanelMenu(props) {

    let location = useLocation();
    let content;

    switch (location.pathname) {
        case '/draw':  {
            content = <NavLink to='/multiplicate' className='top-panel__menu-item'>Работать с кадрами</NavLink>
            break;
        }
        case '/multiplicate': {
            content =  <NavLink to='/draw' className='top-panel__menu-item'>Рисовать</NavLink>;
            break;
        }
        default: {
            content = <NavLink to='/draw' className='top-panel__menu-item'>draw</NavLink>;
        }
    }
    return (
        <div className='top-panel__menu'>
            <div className='top-panel__menu-item'>Файл</div>
            <NavLink to='/createGif' className='top-panel__menu-item'>Сохранить</NavLink>
            {content}
        </div>
    );
}
