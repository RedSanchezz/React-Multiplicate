import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import FrameManager from './../../../Managers/FrameManager/FrameManager';

function MultiplicateCanvasPanel(props) {
    let canvasRef = useRef();

    useEffect(() => {
        FrameManager.setMultiplicateCanvas(canvasRef.current);
    },[]);
    
    useEffect(()=>{
        if(props.frameList.length===0) return;
        let currentFrame = props.currentFrame;
        let context=canvasRef.current.getContext('2d');
        renderCanvas();

        function renderCanvas(){
            //нужно для requestAnimationFrame. Скорее всего он пытается получить нужный фрейм в тот момент, когда он меняется
            if(!props.frameList[props.currentFrame]) return;

            context.clearRect(0, 0, props.drawCanvas.width, props.drawCanvas.height);

            context.drawImage(props.frameList[props.currentFrame].getCanvas(), 0, 0);
            requestAnimationFrame(renderCanvas);

        }

    });

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