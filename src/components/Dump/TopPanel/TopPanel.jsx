import React from 'react';
import './TopPanel.scss';

export default function TopPanel(props) {
    return (
        <div className='top-panel'>
            {props.children}
        </div>
    );
}
