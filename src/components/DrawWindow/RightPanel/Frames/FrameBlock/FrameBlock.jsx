

import React, { useEffect, useRef } from 'react'
import './FrameBlock.scss'
import MultiplicateManager from './../../../../../paint/MultiplicateManager/MultiplicateManager';
import { connect } from 'react-redux';
import Layout from './../../../../../paint/LayoutManager/Layout';
import LayoutManager from '../../../../../paint/LayoutManager/LayoutManager';

class FrameBlock extends React.Component {

    constructor(props){
        super(props);
        this.value = props.value;
        this.index = props.index;
        this.reDraw = this.index===this.props.currentFrame;

    }


    // useEffect(() => {
    //     console.log('start' + index);
    //     refFrameBlock.current.prepend(value.canvas);
    //     return ()=>{
    //         value.canvas.remove();
    //         console.log('kill'+index);

    //     }
    // }, [reDraw, value.id]);


    deleteFrameHandler = (e)=>{
        console.log('del');
        MultiplicateManager.deleteFrame(this.index);
        e.stopPropagation();
    }

    changeDelayHandler = (e) => {
        this.value.delay=e.currentTarget.this.value;
        MultiplicateManager.renderRightPanel();
        e.stopPropagation();
    }

    addToLayoutListHandler =(e) =>{
        let canvas = document.createElement('canvas');
        canvas.width=this.value.canvas.width;
        canvas.height = this.value.canvas.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.value.canvas, 0, 0);

        let layout = new Layout(canvas, ctx, true);
        this.props.layoutList.push(layout);
        LayoutManager.changeLayoutList(this.props.layoutList)
        e.stopPropagation();
    }

    upPositionHandler = (e)=> {
        MultiplicateManager.swap(this.index, this.index-1);
        e.stopPropagation();
    }

    downPositionHandler = (e) =>{
        MultiplicateManager.swap(this.index, this.index+1);
        e.stopPropagation();
    }

    setCurrentFrame = (e)=>{
        MultiplicateManager.setCurrentFrame(this.index);
    }

    render(){
        return (
            <div ref={this.refFrameBlock} className='frame-block' style={this.props.currentFrame === this.index ? {background: 'darkred'} : {background: 'none'}} onClick={this.setCurrentFrame}>
                <div className='frame-menu'>
                    <div onClickCapture={this.upPositionHandler} className="frame-menu__item">
                        <img src="img/up.svg" alt="" />
                    </div>
                    <div className="frame-menu__item">
                        <button onClickCapture={this.addToLayoutListHandler}>В слои</button>
                    </div>
                    <div onClickCapture={this.downPositionHandler} className="frame-menu__item down-arrow">
                        <img src="img/up.svg" alt="" />
                    </div>
                </div>
                <div className="frame-block__input-block">
                    <div className="frame-block__input-block-title"><h2>Задержка</h2></div>
                    <input onClickCapture={e=>e.stopPropagation()} value={this.value.delay} onChange={this.changeDelayHandler} min='0'  type="number" />
                    <img onClickCapture={this.deleteFrameHandler} src="img/delete.svg" alt="" />
                </div>
            </div>
        )
    }
}

function mapStateToPorps(state){
    return {
        // layoutList: state.layouts.layoutList,
        // frameList: state.multiplicate.frameList,
        currentFrame: state.multiplicate.currentFrame
    }
}

export default connect(mapStateToPorps)(FrameBlock);