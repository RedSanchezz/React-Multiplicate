import React from 'react';
import './TopPanel.scss';

export default function TopPanel(props) {
    return (
        <div className='top-panel'>
            <div className="top-panel__logo">
                {/* <img src="./img/test-logo.jpg" alt=""/> */}
            </div>
            {props.children}
        </div>
    );
}
