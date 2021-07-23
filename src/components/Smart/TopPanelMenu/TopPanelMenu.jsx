import React from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import './TopPanelMenu.scss';

export default function TopPanelMenu(props) {

    let location = useLocation();
    let content;


    let forSwitch = location.pathname.match(/\/\w+/)[0];
    // console.log('top panel');
    // console.log(forSwitch);
    switch (forSwitch) {
        case '/draw':  {
            content =
                <>
                    <NavLink to='/save' className='top-panel__menu-item'>Сохранить</NavLink>
                    <NavLink to='/frames' className='top-panel__menu-item'>Работать с кадрами</NavLink>
                </>
            break;
        }
        case '/frames': {
            content =
                <>
                    <NavLink to='/save' className='top-panel__menu-item'>Сохранить</NavLink>
                    <NavLink to='/draw' className='top-panel__menu-item'>Рисовать</NavLink>
                </>;
            break;
        }
        case '/save': {
            content =
                <>
                    <NavLink to='/draw' className='top-panel__menu-item'>Рисовать</NavLink>
                    <NavLink to='/frames' className='top-panel__menu-item'>Работать с кадрами</NavLink>
                </>;
            break;
        }
        default: {
            content = <NavLink to='/draw' className='top-panel__menu-item'>draw</NavLink>;
        }
    }
    return (
        <div className='top-panel__menu'>
            <div className='top-panel__menu-item'>Файл</div>
            {content}
        </div>
    );
}
