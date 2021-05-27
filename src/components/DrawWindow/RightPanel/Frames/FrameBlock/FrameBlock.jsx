

import React, { useEffect, useRef } from 'react'
import './FrameBlock.scss'
import MultiplicateManager from './../../../../../paint/MultiplicateManager/MultiplicateManager';
import { connect } from 'react-redux';
import Layout from './../../../../../paint/LayoutManager/Layout';
import LayoutManager from '../../../../../paint/LayoutManager/LayoutManager';

function FrameBlock(props) {

    let value = props.value;
    let index = props.index;
    let reDraw = index===props.currentFrame;
    let refFrameBlock = React.createRef();

    useEffect(() => {
        refFrameBlock.current.prepend(value.canvas);
        return ()=>{
            value.canvas.remove();
        }
    }, [value.id]);


    function deleteFrameHandler (e){
        console.log('del');
        MultiplicateManager.deleteFrame(index);
        e.stopPropagation();
    }

    function changeDelayHandler (e) {
        value.delay=e.currentTarget.value;
        MultiplicateManager.renderRightPanel();
        e.stopPropagation();
    }

    function addToLayoutListHandler(e){
        let canvas = document.createElement('canvas');
        canvas.width=value.canvas.width;
        canvas.height = value.canvas.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(value.canvas, 0, 0);

        let layout = new Layout(canvas, ctx, true);
        props.layoutList.push(layout);
        LayoutManager.changeLayoutList(props.layoutList)
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


        return (
            <div ref={refFrameBlock} className='frame-block' style={props.currentFrame === index ? {background: 'darkred'} : {background: 'none'}} onClick={setCurrentFrame}>
                <div className='frame-menu'>
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
                    <div className="frame-block__input-block-title"><h2>Задержка</h2></div>
                    <input onClickCapture={e=>e.stopPropagation()} value={value.delay} onChange={changeDelayHandler} min='0'  type="number" />
                    <img onClickCapture={deleteFrameHandler} src="img/delete.svg" alt="" />
                </div>
            </div>
        )
    
}

function mapStateToPorps(state){
    return {
        currentFrame: state.multiplicate.currentFrame
    }
}

export default connect(mapStateToPorps)(FrameBlock);