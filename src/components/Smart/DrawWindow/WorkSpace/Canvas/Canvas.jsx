import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setCanvas} from '../../../../../redux/actionCreators/canvasActionCreator';
import store from '../../../../../redux/store';
import './Canvas.scss';

import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import LayoutManager from '../../../../../Managers/LayoutManager/LayoutManager';
import Layout from '../../../../../models/Layout';

function Canvas(props) {

    let canvas = React.createRef();
    const setCanvas = props.setCanvas();
    //Когда компонент отрендерился, добавляем холст в state
    useEffect(() => {
        let context = canvas.current.getContext('2d');
        setCanvas(canvas.current, context);
        window.addEventListener('keydown', toMultiplicate);

        return () => {
            window.removeEventListener('keydown', toMultiplicate);
        };
    }, [canvas, setCanvas]);


    function toMultiplicate(e) {
        if (e.code === 'KeyS' && e.ctrlKey) {
            let canvas = store.getState().canvas.canvas;
            let context = store.getState().canvas.context;
            if (canvas != null) {
                let layout = new Layout(canvas, context, true, ++LayoutManager.id);
                FrameManager.addFrame(layout, 100);
            }
            e.preventDefault();
        }
    }

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


