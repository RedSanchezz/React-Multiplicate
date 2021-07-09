
import React, { useEffect } from 'react'
import './FrameItem.scss'
import MultiplicateManager from '../../../../../paint/MultiplicateManager/MultiplicateManager';
import { connect } from 'react-redux';
import Layout from '../../../../../paint/LayoutManager/Layout';
import LayoutManager from '../../../../../paint/LayoutManager/LayoutManager';
import { useState } from 'react';

function FrameItem(props) {

    const value = props.value;
    const id = value.getId();

    const index = props.index;
    const refFrameBlock = React.createRef();

    let [active, setActive] = useState(false);

    useEffect(() => {
        refFrameBlock.current.prepend(value.getCanvas());
        value.getCanvas().style.backgroundColor=props.defaultBackgorund;
        return ()=>{
            value.getCanvas().remove();
        }
    }, [id, props.defaultBackgorund, value, refFrameBlock]);


    function deleteFrameHandler (e){
        MultiplicateManager.deleteFrame(index);
        e.stopPropagation();
    }


    function changeDelayHandler(e) {
        value.setDelay(e.currentTarget.value);
        MultiplicateManager.renderRightPanel();
        e.stopPropagation();
    }

    
    function addToLayoutListHandler(e){
        let canvas = document.createElement('canvas');
        canvas.width=value.getCanvas().width;
        canvas.height = value.getCanvas().height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(value.getCanvas(), 0, 0);

        let layout = new Layout(canvas, ctx, true, ++LayoutManager.id);
        props.layoutList.push(layout);
        LayoutManager.changeLayoutList(props.layoutList);
        e.stopPropagation();
    }

    function upPositionHandler(e){
        MultiplicateManager.swap(index, index-1);
        e.stopPropagation();
    }

    function downPositionHandler(e){
        MultiplicateManager.swap(index, index+1);
        e.stopPropagation();
    }

    function setCurrentFrame (e){
        MultiplicateManager.setCurrentFrame(index);
    }

    function clickOpenHandler(e){
        console.log('eee');
        setActive(!active);
        e.stopPropagation();
    }

    function clickCloseHandler(){
        setActive(false);
    }
    let className = active ? 'frame-block opened' : 'frame-block';
    return (
        <div ref={refFrameBlock} 
            className={className}
            style={props.currentFrame === index ? {background: 'darkred'} : {}} 
            onClick={setCurrentFrame}>
            <span className='frame-block__index'>{props.index+1}</span>

            <div className='frame-block__open-close-btn'
                onClick={clickOpenHandler}></div>

            <div className='frame-block__menu frame-menu'>
                <div onClickCapture={upPositionHandler} className="frame-menu__item">
                    <img src="img/up.svg" alt="" />
                </div>
                <div className="frame-menu__item">
                    <button onClickCapture={addToLayoutListHandler}>В слои</button>
                </div>
                <div onClickCapture={downPositionHandler} className="frame-menu__item down-arrow">
                    <img src="img/up.svg" alt="" />
                </div>
            </div>

            <div className="frame-block__input-block">
                    <h2>Задержка</h2>
                    <input onClickCapture={e=>e.stopPropagation()} 
                        value={value.getDelay()} 
                        onChange={changeDelayHandler} 
                        min='0'  type="number" />
            </div>
            <div className='frame-block__delete-btn'>                
                <img onClickCapture={deleteFrameHandler} src="img/delete.svg" alt="" />
            </div>
        </div>
    )
    
}

function mapStateToPorps(state){
    return {
        currentFrame: state.multiplicate.currentFrame,
        defaultBackgorund: state.setting.canvasDefaultBackground,
        layoutList: state.layouts.layoutList
    }
}

export default connect(mapStateToPorps)(FrameItem);