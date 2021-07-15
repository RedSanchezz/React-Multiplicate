import React from 'react';
import './RightPanel.scss'

function RightPanel(props) {
    return (
        <div className='right-panel'>
            {props.children}
        </div>
    );
}

export default RightPanel;