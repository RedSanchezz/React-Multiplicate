import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCanvas } from '../../../redux/actionCreators/canvasActionCreator';
import './Canvas.scss'
import ToolManager from './../../../paint/ToolManager/ToolManager';
function Canvas(props) {

    let canvas = React.createRef();

    useEffect(() => {
        let context = canvas.current.getContext('2d');
        props.setCanvas(canvas.current, context);

    }, [])

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
        tmpCanvas: state.canvas.tmpCanvas
    }
}


function mapDispatchToProps(dispatch){
    return {
        setCanvas: bindActionCreators(setCanvas, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
