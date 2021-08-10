import React from 'react';
import {connect} from 'react-redux';

import './BrushSettingPanel.scss';

import ToolManager from '../../../../../Managers/ToolManager/ToolManager';
import ColorHelper from '../../../../../utils/ColorHelper';
import InputsBlock from '../../../../Dump/InputsBlock/InputsBlock';
import SavedBrushes from './SavedBrushes/SavedBrushes';

function BrushSettingPanel(props) {

    function changeSizeInputsHandler(e) {
        let tool = ToolManager.getTool();
        tool.setSize(e.target.value);
    }

    function changeColorInputsHandler(e) {
        let tool = ToolManager.getTool();
        tool.setColor(e.target.value);
    }

    function setBrushAlphaHandler(e) {
        let tool = ToolManager.getTool();
        tool.setAlpha(e.target.value);
    }

    function saveBrushHandler(e) {
        ToolManager.saveBrush({color: props.brushColor, alpha: props.brushAlpha, size: props.brushSize});
    }

    return (
        <div className="brush-panel">
            <InputsBlock title='Размер кисти'
                         value ={props.brushSize}
                         onChange={changeSizeInputsHandler}
                         max='250' min='0' step={'1'}
            />
            <InputsBlock title='Прозрачность'
                         value={props.brushAlpha}
                         onChange={setBrushAlphaHandler}
                         max='1' min='0' step={'0.01'}
            />
            <div className="brush-panel__block brush-color">
                <div className="brush-panel__panel-title">Цвет кисти</div>
                <div className="brush-panel__inputs-block">
                    <input onChange={changeColorInputsHandler} value={ColorHelper.toHex(props.brushColor)}
                           type="color"/>
                    <input value={ColorHelper.toHex(props.brushColor)} type="text"/>
                </div>
            </div>
            <div className="brush-panel__block">
                <button onClick={saveBrushHandler} className='panel__block-button add-brush-btn'>
                    <img src={process.env.PUBLIC_URL + "/img/plus-icon.svg"} alt=''/>
                </button>
            </div>
            <SavedBrushes></SavedBrushes>
        </div>
    );
}


function mapStateToProps(state) {
    return {
        brushSize: state.tool.brush.size,
        brushColor: state.tool.brush.color,
        brushAlpha: state.tool.brush.alpha,
        savedBrushes: state.tool.brush.savedBrushes
    };
}

export default connect(mapStateToProps)(BrushSettingPanel);