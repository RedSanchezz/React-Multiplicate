import React from 'react';
import './LeftPanel.scss';


function LeftPanel(props) {
    return (
        <div className='left-panel'>
            {props.children}
        </div>
    );
}

export default LeftPanel;