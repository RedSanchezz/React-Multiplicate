import React from 'react';
import './ContextMenu.scss';

function ContextMenu(props) {

    function contextMenuMouseLeaveHandler() {
        props.setMenuActive(false);
    }

    return (
        <div className={props.active ? 'context-menu active' : 'context-menu'}
              onMouseLeave={contextMenuMouseLeaveHandler}
              style={{top: props.menuPosition.x, left: props.menuPosition.y}}>
            {props.children}
        </div>
    );
}

export default ContextMenu;