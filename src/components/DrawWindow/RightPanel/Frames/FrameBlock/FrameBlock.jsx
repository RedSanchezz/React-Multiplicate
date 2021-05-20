

import React, { useEffect, useRef } from 'react'
import './FrameBlock.scss'
import MultiplicateManager from './../../../../../paint/MultiplicateManager/MultiplicateManager';
import { connect } from 'react-redux';
import Layout from './../../../../../paint/LayoutManager/Layout';
import { bindActionCreators } from 'redux';
import { changeLayoutList } from '../../../../../redux/actionCreators/layoutActionCreator';

function FrameBlock(props) {
    let value = props.value;
    let index = props.index;

    let refCanvas = useRef();

    useEffect(() => {
        console.log('effect');
        let canvas   = refCanvas.current;
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, value.canvas.width, value.canvas.height);
        context.drawImage(value.canvas, 0, 0);
    }, [props.frameList])

    function deleteFrameHandler(){
        console.log('del');
        MultiplicateManager.deleteFrame(index);
    }

    function changeDelayHandler(e){
        value.delay=e.currentTarget.value;
        MultiplicateManager.renderRightPanel();
    }

    function addToLayoutListHandler(e){
        let canvas = document.createElement('canvas');
        canvas.width=value.canvas.width;
        canvas.height = value.canvas.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(value.canvas, 0, 0);

        let layout = new Layout(canvas, ctx, true, props.layoutManager);
        props.layoutList.push(layout);
        props.changeLayoutList(props.layoutList);
    }

    function upPositionHandler(e){
        MultiplicateManager.swap(index, index-1);
    }

    function downPositionHandler(e){
        MultiplicateManager.swap(index, index+1);
    }

    return (
        <div className='frame-block'>
            <canvas
                width={value.canvas.width}
                height={value.canvas.height}
                ref={refCanvas}>
            </canvas>
            <div className='frame-menu'>
                <div onClick={upPositionHandler} className="frame-menu__item">
                    <img src="img/up.svg" alt="" />
                </div>
                <div className="frame-menu__item">
                    <button onClick={addToLayoutListHandler}>В слои</button>
                </div>
                <div onClick={downPositionHandler} className="frame-menu__item down-arrow">
                    <img src="img/up.svg" alt="" />
                </div>
            </div>
            <div className="frame-block__input-block">
                <div className="frame-block__input-block-title"><h2>Задержка</h2></div>
                <input value={value.delay} onChange={changeDelayHandler} min='0'  type="number" />
                <img onClick={deleteFrameHandler} src="img/delete.svg" alt="" />
            </div>
        </div>
    )
}

function mapStateToPorps(state){
    return {
        layoutManager: state.layouts.layoutManager,
        layoutList: state.layouts.layoutList,
        frameList: state.multiplicate.frameList
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeLayoutList: bindActionCreators(changeLayoutList, dispatch)
    }
}

export default connect(mapStateToPorps, mapDispatchToProps)(FrameBlock);