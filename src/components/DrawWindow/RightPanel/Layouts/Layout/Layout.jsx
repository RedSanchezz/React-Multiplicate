import React, { useRef } from 'react';
import  ReactDOM  from 'react-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCurrentLayout } from '../../../../../redux/actionCreators/layoutActionCreator';
import './Layout.scss'
import MultiplicateManager from './../../../../../paint/MultiplicateManager/MultiplicateManager';
import LayoutManager from '../../../../../paint/LayoutManager/LayoutManager';


function Layout(props) {

    let contextMenu = useRef();
    let layout = props.value;
    let canvas = layout.getCanvas();

    let canvasJsx = getCanvas(canvas);
    let index = props.index;


    function hideLayoutHandler(e){
        LayoutManager.toggleHide(index);
        props.changeCurrentLayout(props.currentLayout, index);
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
        LayoutManager.update();
        LayoutManager.render();
        e.stopPropagation();
    }

    function historyNextHandler(e){
        layout.next();
        LayoutManager.update();
        LayoutManager.render();
        e.stopPropagation();
    }

    function deleteLayoutHandler(e){
        LayoutManager.deleteLayout(index);
        e.stopPropagation();
    }



    function contextMenuHandler(e){
        if(layout.selected){
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
            if(value.selected) indexArray.push(index);
            return value;
        })
        LayoutManager.deleteLayouts(indexArray);
    }

    function combineSelectedHandler(e){
        let indexArray =[];
        props.layoutList.map((value, index) => {
            if(value.selected) indexArray.push(index);
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
        <div onClick={deleteSelectedHandler} className="right-panel__context-menu-item">Удалить выбранные</div>
        <div onClick = {combineSelectedHandler} className="right-panel__context-menu-item">Обьеденить</div>
        <div onClick = {unselectAllHandler} className="right-panel__context-menu-item">Отменить выделение</div>
    </div>;

    return (<React.Fragment>
                {ReactDOM.createPortal(menu, document.getElementById('root'))}
                <div onContextMenu={contextMenuHandler} onClick={setCurrent} key={index} style={layout.selected ? {backgroundColor: 'darkred'} : {backgroundColor:'black'}} className='right-panel__layout-block layout-block'>
                    <div className='layout-block__left-menu'>
                        <div onClick={upHandler} className="layout-block__left-menu-item"><img src="/img/up.svg" alt="" /></div>
                        <div onClick={hideLayoutHandler} className="layout-block__left-menu-item">
                            {!layout.isHidden() ? <img src="/img/show.svg" alt="" /> : <img src="/img/hide.svg" alt="" />}
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
                    {canvasJsx}
                </div>
            </React.Fragment>)


    function getCanvas(canvas){   
        return (<canvas 
                    style={props.value===props.currentLayout ? {outline: '10px solid red'} : {}}
                    ref={(c) => {
                        let context = c?.getContext('2d');
                        if(context) {
                            context?.clearRect(0, 0, canvas.width, canvas.height);
                            context?.drawImage(canvas, 0, 0);
                        }
                    }} 
                    width={canvas.width} 
                    height={canvas.height}>
                </canvas>)
    }
}

function mapStateToProps(state){
    return {
        layoutList: state.layouts.layoutList,
        currentLayout: state.layouts.currentLayout,
        forRender: state.layouts
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeCurrentLayout: bindActionCreators(changeCurrentLayout, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
