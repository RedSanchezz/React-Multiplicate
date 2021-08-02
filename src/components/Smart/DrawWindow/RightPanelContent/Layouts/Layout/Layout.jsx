import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import './Layout.scss';
import LayoutManager from '../../../../../../Managers/LayoutManager/LayoutManager';
import FrameManager from '../../../../../../Managers/FrameManager/FrameManager';


function Layout(props) {

    let layout = props.layout;
    let canvas = layout.getCanvas();

    let layoutBlock = useRef();
    let index = props.index;


    function keyDownHandler(e){
        if (e.ctrlKey && e.code==='KeyZ' && e.shiftKey) {
            layout.historyNext();
            return;
        }

        if (e.ctrlKey && e.code==='KeyZ'){
            layout.historyBack();
        }
    }

    useEffect(()=>{
        if(props.isCurrent) {
            window.addEventListener('keyup', keyDownHandler);
            console.log('added' + layout.getId());
        }

        return ()=>{
            window.removeEventListener('keyup', keyDownHandler);
            console.log('removed' + layout.getId());
        }
    }, [props.isCurrent])

    //когда компонент отрендерился, вставляем канвас из модели
    useEffect(() => {
        layoutBlock.current.append(canvas);
        canvas.style.backgroundColor = props.defaultBackgorund;
        canvas.style.outline = props.isCurrent ? '10px solid red' : 'none';
        //когда компонент демонтируется, удаляем канвас
        return () => {
            canvas.remove();
        };
    });

    function hideLayoutHandler(e) {
        LayoutManager.toggleHide(index);
        e.stopPropagation();
    }

    function clickToLayoutHandler(e) {
        if (e.ctrlKey) {
            LayoutManager.select(index);
            return;
        }
        LayoutManager.setCurrentLayout(index);
        e.stopPropagation();
    }

    function upHandler(e) {
        LayoutManager.swap(index, index - 1);
        e.stopPropagation();
    }

    function downHandler(e) {
        LayoutManager.swap(index, index + 1);
        e.stopPropagation();
    }

    function historyBackHandler(e) {
        layout.historyBack();
        //обновляем основной канвас, перерисовывая каждый слой
        LayoutManager.update();
        e.stopPropagation();
    }

    function historyNextHandler(e) {
        layout.historyNext();
        //обновляем основной канвас, перерисовывая каждый слой
        LayoutManager.update();
        e.stopPropagation();
    }

    function deleteLayoutHandler(e) {
        LayoutManager.deleteLayout(index);
        e.stopPropagation();
    }


    function contextMenuHandler(e) {
        if (layout.isSelected()) {
            props.setMenuActive(true);
            let x = e.pageY - 10;
            let y = e.pageX - 20;
            //если меню выезжает за правый край
            if (y + 200 >= window.innerWidth) {
                y = window.innerWidth - 200;
            }
            props.setMenuPosition({x, y});
        }

        e.stopPropagation();
        e.preventDefault();
    }

    function addToMultiplicate() {
        FrameManager.addFrame(layout, 100);
    }

    return (
        <div onContextMenu={contextMenuHandler}
             ref={layoutBlock}
             onClick={clickToLayoutHandler}
             key={index}
             style={props.isSelected ? {backgroundColor: 'darkred'} : {backgroundColor: 'black'}}
             className='right-panel__layout-block layout-block'>

            <div className='layout-block__left-menu'>
                <div onClick={upHandler} className="layout-block__left-menu-item">
                    <img src={process.env.PUBLIC_URL + "/img/up.svg"} alt=""/>
                </div>
                <div onClick={hideLayoutHandler} className="layout-block__left-menu-item">
                    {!props.isHidden ? <img src={process.env.PUBLIC_URL + "/img/show.svg"} alt=""/> : <img src="./img/hide.svg" alt=""/>}
                </div>
                <div onClick={deleteLayoutHandler} className="layout-block__left-menu-item">
                    <img src={process.env.PUBLIC_URL + "/img/delete.svg"} alt=""/>
                </div>
                <div onClick={downHandler} className="layout-block__left-menu-item">
                    <img src={process.env.PUBLIC_URL + "/img/up.svg"} alt="" style={{transform: 'rotateX(180deg)'}}/>
                </div>
            </div>
            <div className='layout-block__bottom-menu'>
                <div className="layout-block__bottom-menu-item history">History</div>
                <div onClick={historyBackHandler} className="layout-block__bottom-menu-item back">
                    <img src={process.env.PUBLIC_URL + "/img/up.svg"} alt="" style={{transform: 'rotateZ(-90deg)'}}/>
                </div>
                <div onClick={addToMultiplicate} className="layout-block__bottom-menu-item favorites">Для мульта</div>
                <div onClick={historyNextHandler} className="layout-block__bottom-menu-item next">
                    <img src={process.env.PUBLIC_URL + "/img/up.svg"} alt="" style={{transform: 'rotateZ(90deg)'}}/>
                </div>
            </div>
        </div>
    );
}


function mapStateToProps(state) {
    return {
        defaultBackgorund: state.setting.canvasDefaultBackground
    };
}

export default connect(mapStateToProps)(Layout);