import React, { useEffect, useRef, useState } from 'react';
import  ReactDOM  from 'react-dom';

import { connect } from 'react-redux';
import './Layout.scss'
import MultiplicateManager from './../../../../../paint/MultiplicateManager/MultiplicateManager';
import LayoutManager from '../../../../../paint/LayoutManager/LayoutManager';

function Layout(props) {

    let contextMenu = useRef();

    let layout = props.value;
    let canvas = layout.getCanvas();

    let layoutBlock = useRef();
    let index = props.index;

    useEffect(() => {
        console.log('rend Layput' + index);
        layoutBlock.current.append(canvas);
        canvas.style.backgroundColor=props.defaultBackgorund;
        canvas.style.outline = props.isCurrent ? '10px solid red' : 'none';
        //перерисовываем канвас, только у активного слоя 
        return ()=>{
            canvas.remove();
        }
    });

    function hideLayoutHandler(e){
        LayoutManager.toggleHide(index);
        e.stopPropagation();
    }

    function setCurrent(e){
        if(e.ctrlKey) {
            LayoutManager.select(index);
            return;
        }
        LayoutManager.setCurrentLayout(index);
        e.stopPropagation();
    }

    function upHandler(e){
        LayoutManager.swap(index, index-1);
        e.stopPropagation();
    }

    function downHandler(e){
        LayoutManager.swap(index, index+1);
        e.stopPropagation();
    }

    function historyBackHandler(e){
        layout.back();
        //обновляем большой канвас
        LayoutManager.update();
        //вызываем отрисовку
        LayoutManager.renderAll();
        e.stopPropagation();
    }

    function historyNextHandler(e){
        layout.next();
        LayoutManager.update();
        LayoutManager.renderAll();
        e.stopPropagation();
    }

    function deleteLayoutHandler(e){
        LayoutManager.deleteLayout(index);
        e.stopPropagation();
    }

    function contextMenuHandler(e){
        if(layout.isSelected()){
            contextMenu.current.classList.add('active');
            contextMenu.current.style.top = e.pageY-10+'px';
            contextMenu.current.style.left = e.pageX-20+'px';
        }
        e.stopPropagation();
        e.preventDefault();
    }

    function deleteSelectedHandler(e){
        let indexArray =[];
        props.layoutList.map((value, index) => {
            if(value.isSelected()) indexArray.push(index);
            return value;
        })
        LayoutManager.deleteLayouts(indexArray);
    }

    function combineSelectedHandler(e){
        let indexArray =[];
        props.layoutList.map((value, index) => {
            if(value.isSelected()) indexArray.push(index);
        })
        LayoutManager.combine(indexArray);
    }

    function contextMenuMouseLeaveHandler(){
        contextMenu.current.classList.remove('active');
    }

    function unselectAllHandler(){
        LayoutManager.unSelectAll();
    }

    function addToMultiplicate(){
        MultiplicateManager.addFrame(layout, 100);
    }

    let menu = 
    <div ref={contextMenu} onContextMenu={(e)=>{e.stopPropagation(); e.preventDefault()}} onMouseLeave = {contextMenuMouseLeaveHandler} className='right-panel__context-menu'>
        <div onClick = {deleteSelectedHandler}  className="right-panel__context-menu-item">Удалить выбранные</div>
        <div onClick = {combineSelectedHandler} className="right-panel__context-menu-item">Обьеденить</div>
        <div onClick = {unselectAllHandler}     className="right-panel__context-menu-item">Отменить выделение</div>
    </div>;

    return (    
                <div onContextMenu={contextMenuHandler} 
                        ref={layoutBlock}
                        onClick={setCurrent} 
                        key={index} 
                        style={props.isSelected ? {backgroundColor: 'darkred'} : {backgroundColor:'black'}} className='right-panel__layout-block layout-block'>
                    {ReactDOM.createPortal(menu, document.getElementById('root'))}
                    <div className='layout-block__left-menu'>
                        <div onClick={upHandler} className="layout-block__left-menu-item"><img src="/img/up.svg" alt="" /></div>
                        <div onClick={hideLayoutHandler} className="layout-block__left-menu-item">
                            {!props.isHidden ? <img src="/img/show.svg" alt="" /> : <img src="/img/hide.svg" alt="" />}
                        </div>
                        <div onClick={deleteLayoutHandler} className="layout-block__left-menu-item"><img src="/img/delete.svg" alt="" /></div>
                        <div onClick={downHandler} className="layout-block__left-menu-item"><img src="/img/up.svg" alt="" style={{transform: 'rotateX(180deg)'}} /></div>
                    </div>
                    <div className='layout-block__bottom-menu'>
                        <div className="layout-block__bottom-menu-item history">History</div>
                        <div onClick={historyBackHandler} className="layout-block__bottom-menu-item back"><img src="/img/up.svg" alt="" style={{transform: 'rotateZ(-90deg)'}} /></div>
                        <div onClick={addToMultiplicate} className="layout-block__bottom-menu-item favorites">Для мульта</div>
                        <div onClick={historyNextHandler} className="layout-block__bottom-menu-item next"><img src="/img/up.svg" alt="" style={{transform: 'rotateZ(90deg)'}} /></div>
                    </div>
                </div>
            )
}


function mapStateToProps(state){
    return {
        defaultBackgorund: state.setting.canvasDefaultBackground,
    }
}

export default connect(mapStateToProps)(Layout);