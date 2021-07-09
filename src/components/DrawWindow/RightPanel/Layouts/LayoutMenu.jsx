
import React, { useRef } from 'react'
import LayoutManager from './../../../../paint/LayoutManager/LayoutManager';

function LayoutMenu(props) {

    let menuBlock = useRef();

    function deleteSelectedHandler(e){
        props.setMenuActive(false);
        let indexArray =[];
        console.log(props.layoutList);
        props.layoutList.map((value, index) => {
            if(value.isSelected()) indexArray.push(index);
            return value;
        })
        LayoutManager.deleteLayouts(indexArray);
    }

    function combineSelectedHandler(e){
        props.setMenuActive(false);
        let indexArray =[];
        props.layoutList.map((value, index) => {
            if(value.isSelected()) indexArray.push(index);
            return value;
        })
        LayoutManager.combine(indexArray);
    }

    function contextMenuMouseLeaveHandler(){
        props.setMenuActive(false);
    }

    function unselectAllHandler(){
        LayoutManager.unSelectAll();
    }

    return (
        <div ref={menuBlock} 
            onContextMenu={(e)=>{e.stopPropagation(); e.preventDefault()}} 
            onMouseLeave = {contextMenuMouseLeaveHandler} 
            className={props.active ? 'right-panel__context-menu active' : 'right-panel__context-menu'} 
            style={{top: props.menuPosition.x, left: props.menuPosition.y}}>
                <div onClick = {deleteSelectedHandler}  className="right-panel__context-menu-item">Удалить выбранные</div>
                <div onClick = {combineSelectedHandler} className="right-panel__context-menu-item">Обьеденить</div>
                <div onClick = {unselectAllHandler}     className="right-panel__context-menu-item">Отменить выделение</div>
        </div>
    )
}
export default LayoutMenu;
