import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import Layout from './Layout/Layout';
import './Layouts.scss';

function Layouts(props) {

    let contextMenu = useRef();
    let layoutListBlock = useRef();

    function addLayoutHandler(){
        props.layoutManager.addLayout();
    }
    function cancelSelection(){
        props.layoutManager.unSelectAll();
    }
    function contextMenuHandler(e){
        let currentTargetRect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.pageX - currentTargetRect.left;
        const offsetY = e.pageY - currentTargetRect.top;
        contextMenu.current.classList.add('active');

        contextMenu.current.style.top = offsetY-10+'px';
        contextMenu.current.style.left = offsetX-20+'px';

        e.stopPropagation();
        e.preventDefault();
    }
    function contextMenuMouseLeaveHandler(){
        contextMenu.current.classList.remove('active');
    }

    function deleteSelectedHandler(e){
        let indexArray =[];

        props.layoutList.map((value, index, array) => {
            if(value.selected) indexArray.push(index);
        })
        props.layoutManager.deleteLayouts(indexArray);
    }
    function combineSelectedHandler(e){
        let indexArray =[];

        props.layoutList.map((value, index, array) => {
            if(value.selected) indexArray.push(index);
        })
        
        props.layoutManager.combine(indexArray);

    }
    return (
        <>
            <div className='right-panel__layout-buttons'>
                <button onClick={addLayoutHandler}>Добавить слой</button>
                <button onClick={cancelSelection}>Отменить выделение</button>
            </div>
            <div onContextMenuCapture={contextMenuHandler} ref={layoutListBlock} className='right-panel__layout-list'>

                <div ref={contextMenu} onContextMenu={(e)=>{e.stopPropagation(); e.preventDefault()}} onMouseLeave = {contextMenuMouseLeaveHandler} className='right-panel__context-menu'>
                    <div onClick={deleteSelectedHandler} className="right-panel__context-menu-item">Удалить выбранные</div>
                    <div onClick = {combineSelectedHandler} className="right-panel__context-menu-item">Обьеденить</div>
                </div>
                {
                    props.layoutList.map((value, index) => {
                        return <Layout key={index} value={value} index={index}></Layout>
                    })
                }
            </div>
        </>
    )

}

function mapStateToProps(state){
    return {
        layoutList: state.layouts.layoutList,
        currentLayout: state.layouts.currentLayout,
        forRender: state.layouts,
        layoutManager: state.layouts.layoutManager
    }
}



export default connect(mapStateToProps)(Layouts);
