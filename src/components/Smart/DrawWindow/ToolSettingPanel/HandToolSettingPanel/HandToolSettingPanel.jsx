import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setCanvasPosition, setCanvasZoom} from '../../../../../redux/actionCreators/canvasActionCreator';
import InputsBlock from '../../../../Dump/InputsBlock/InputsBlock';
import './HandToolSettingPanel.scss'

function HandToolSettingPanel(props) {

    function zoomChangeHandler(e) {
        props.setCanvasZoom(e.currentTarget.value);
    }

    function canvasTopPositionHandler(e) {
        props.setCanvasPosition({
            top: e.currentTarget.value+'px',
            left: props.left
        })
    }
    function canvasLeftPositionHandler(e) {
        props.setCanvasPosition({
            top: props.top,
            left: e.currentTarget.value +'px',
        })
    }

    function clickBackToCenterBtn() {
        props.setCanvasPosition({
            top: '1px',
            left: '1px',
        })
    }
    return (
        <div className='top-panel__setting-hand-tool'>
            <div>
                <InputsBlock title='Увеличение'
                             onChange={zoomChangeHandler}
                             max='5' min='0.1' step='0.1'
                             value={props.canvasZoom}
                />
            </div>
            <div>
                <InputsBlock title='x координата'
                             onChange={canvasLeftPositionHandler}
                             max={parseInt(props.canvasSize.width)} min={-parseInt(props.canvasSize.width)} step='1'
                             value={parseInt(props.left)}
                />
            </div>
            <div>
                <InputsBlock title='y координата'
                             onChange={canvasTopPositionHandler}
                             max={parseInt(props.canvasSize.height)} min={-parseInt(props.canvasSize.height)} step='1'
                             value={parseInt(props.top)}
                />
            </div>
            <div className='top-panel__center-btn'>
                <button onClick={clickBackToCenterBtn}>Вернуть по центру</button>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        canvasZoom: state.canvas.zoom,
        top: state.canvas.position.top,
        left: state.canvas.position.left,
        canvasSize: state.canvas.size

    };
}

function mapDispatchToPorps(dispatch) {
    return {
        setCanvasZoom: bindActionCreators(setCanvasZoom, dispatch),
        setCanvasPosition: bindActionCreators(setCanvasPosition, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToPorps)(HandToolSettingPanel);

