import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setCanvasZoom} from '../../../../../redux/actionCreators/canvasActionCreator';
import InputsBlock from '../../../../Dump/InputsBlock/InputsBlock';

function HandToolSettingPanel(props) {

    function zoomChangeHandler(e) {
        console.log(e.currentTarget);
        props.setCanvasZoom(e.currentTarget.value);
    }

    return (
        <div>
            <div>
                <InputsBlock title='Увеличение'
                             onChange={zoomChangeHandler}
                             max='5' min='0.1' step='0.1'
                             value={props.canvasZoom}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        canvasZoom: state.canvas.zoom
    };
}

function mapDispatchToPorps(dispatch) {
    return {
        setCanvasZoom: bindActionCreators(setCanvasZoom, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToPorps)(HandToolSettingPanel);

