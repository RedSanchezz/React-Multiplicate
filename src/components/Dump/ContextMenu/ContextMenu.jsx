import React, {useEffect, useRef, useState} from 'react';
import './ContextMenu.scss';

let timeoutId;

function ContextMenu(props) {

    let [menuClass, setMenuClass] = useState('context-menu disabled');

    function contextMenuMouseLeaveHandler() {
        setMenuClass('context-menu');
        timeoutId=setTimeout(()=>{
            console.log('timeout end');
            props.setMenuActive(false);
        },300);
    }
    function contextMenuOnMouseMove() {
        clearTimeout(timeoutId);
        setMenuClass('context-menu active');
    }

    useEffect(()=>{
        if(props.active){
            setMenuClass('context-menu');
            setTimeout(()=>{
                setMenuClass('context-menu active');
            }, 300);
        }else {
            setMenuClass('context-menu disabled');
        }
    }, [props.active]);

    return (
        <div className={menuClass}
              onMouseLeave={contextMenuMouseLeaveHandler}
             onMouseEnter={contextMenuOnMouseMove}
              style={{top: props.menuPosition.x, left: props.menuPosition.y}}>
            {props.children}
        </div>
    );
}

export default ContextMenu;