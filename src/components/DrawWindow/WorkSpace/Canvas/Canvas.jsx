import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../../../../paint/LayoutManager/Layout';
import MultiplicateManager from '../../../../paint/MultiplicateManager/MultiplicateManager';
import { setCanvas } from '../../../../redux/actionCreators/canvasActionCreator';
import store from '../../../../redux/store';
import './Canvas.scss';
import LayoutManager from './../../../../paint/LayoutManager/LayoutManager';

function Canvas(props) {

    let canvas = React.createRef();

    useEffect(() => {
        let context = canvas.current.getContext('2d');
        props.setCanvas(canvas.current, context);
        window.addEventListener('keydown', toMultiplicate);
        return ()=>{
            window.removeEventListener('keydown', toMultiplicate)
        }
    }, []);


    function toMultiplicate(e){
        if(e.code==='KeyS' && e.ctrlKey){
            let canvas = store.getState().canvas.canvas;
            let context = store.getState().canvas.context
            if(canvas!=null) {
                let layout = new Layout(canvas, context, true, ++LayoutManager.id);
                MultiplicateManager.addFrame(layout, 100);
            }
            e.preventDefault();
        }
    }
    return (
        <React.Fragment>
            <canvas ref={canvas}
                height={props.height} width={props.width} 
                className='canvas' 
                style={{top: props.top, left: props.left}}>
            </canvas>
        </React.Fragment>
    )

}


function mapStateToProps(state){
    return {
        width: state.canvas.size.width,
        height: state.canvas.size.height,
        top: state.canvas.position.top,
        left: state.canvas.position.left,
        tmpCanvas: state.canvas.tmpCanvas,
    }
}


function mapDispatchToProps(dispatch){
    return {
        setCanvas: bindActionCreators(setCanvas, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);


