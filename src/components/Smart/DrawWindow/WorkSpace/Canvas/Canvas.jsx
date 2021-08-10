import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setCanvas} from '../../../../../redux/actionCreators/canvasActionCreator';
import './Canvas.scss';


function Canvas(props) {

    let canvas = React.createRef();
    const setCanvas = props.setCanvas;
    //Когда компонент отрендерился, добавляем холст в state
    //биндим горячие клавиши
    useEffect(() => {
        let context = canvas.current.getContext('2d');
        setCanvas(canvas.current, context);
        return () => {
        };
    }, [canvas, setCanvas]);


    return (
        <React.Fragment>
            <canvas ref={canvas}
                    height={props.height} width={props.width}
                    className='canvas'
                    style={{
                        top: props.top,
                        left: props.left,
                        transform: `scale(${props.canvasZoom})`
                    }}
            >
            </canvas>
        </React.Fragment>
    );

}


function mapStateToProps(state) {
    return {
        width: state.canvas.size.width,
        height: state.canvas.size.height,
        top: state.canvas.position.top,
        left: state.canvas.position.left,
        tmpCanvas: state.canvas.tmpCanvas,
        canvasZoom: state.canvas.zoom
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCanvas: bindActionCreators(setCanvas, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);


