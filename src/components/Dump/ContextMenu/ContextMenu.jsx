import React, {useEffect, useState} from 'react';
import './ContextMenu.scss';

let timeoutId;

function ContextMenu(props) {

    let [menuClass, setMenuClass] = useState('context-menu disabled');

    function contextMenuMouseLeaveHandler() {
        props.setMenuActive(false);

    }
    function contextMenuOnMouseMove() {
        console.log('enter');
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
            setMenuClass('context-menu');
            setTimeout(()=>{
                setMenuClass('context-menu disabled');

            }, 300);
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