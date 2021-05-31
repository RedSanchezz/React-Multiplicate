import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import MultiplicateManager from './../../../paint/MultiplicateManager/MultiplicateManager';

function MultiplicateCanvasPanel(props) {
    let canvasRef = useRef();


    useEffect(() => {
        MultiplicateManager.setMultiplicateCanvas(canvasRef.current);
    },[]);
    
    useEffect(()=>{
        if(props.frameList.length===0) return;

        let currentFrame = props.currentFrame;
        let context=canvasRef.current.getContext('2d');
        context.clearRect(0, 0, props.drawCanvas.width, props.drawCanvas.height);
        context.drawImage(props.frameList[currentFrame].getCanvas(), 0, 0);
    })


    return (
        <div className='work-space'>
            <canvas ref={canvasRef} width={props.drawCanvas.width} height={props.drawCanvas.height}></canvas>
        </div>
    )
}



function mapStateToProps(state){
    return {
        drawCanvas: state.canvas.canvas,
        frameList: state.multiplicate.frameList,
        currentFrame: state.multiplicate.currentFrame,
    }
}
export default connect(mapStateToProps)(MultiplicateCanvasPanel);