
import React  from 'react';
import { connect } from 'react-redux';

import './BrushPanel.scss';

import ToolManager from '../../../../../paint/ToolManager/ToolManager';
import ColorHelper from '../../../../../utils/ColorHelper';
import SavedColors from './SavedBrushes/SavedBrushes';


function BrushPanel(props) {

    function changeSizeInputsHandler(e){
        let tool = ToolManager.getTool();
        tool.setSize(e.target.value);
    }

    function changeColorInputsHandler(e){
        let tool = ToolManager.getTool();
        tool.setColor(e.target.value);
    }

    function setBrushAlphaHandler(e){
        let tool = ToolManager.getTool();
        tool.setAlpha(e.target.value);
    }

    function saveBrushHandler(e){
        ToolManager.saveBrush({color: props.brushColor, alpha: props.brushAlpha, size: props.brushSize})
    }

    return (
        <div className="brush-panel">
                <div className="brush-panel__block size-block">
                    <div className="brush-panel__panel-titile">Размер кисти</div>
                    <div className="brush-panel__inputs-block">
                        <input min='0' max='200' onChange={changeSizeInputsHandler} value={props.brushSize} type="number" />
                        <input min='0' max='200' onChange={changeSizeInputsHandler} value={props.brushSize} type="range" />
                    </div>
                </div>
                <div className="brush-panel__block ">
                    <div className="brush-panel__panel-titile">Прозрачность</div>
                    <div className="brush-panel__inputs-block">
                        <input min='0' max='1' step='0.01' onChange={setBrushAlphaHandler} value={props.brushAlpha} type="number" />
                        <input min='0' max='1' step='0.01' onChange={setBrushAlphaHandler} value={props.brushAlpha} type="range" />
                    </div>
                </div>
                <div className="brush-panel__block">
                    <div className="brush-panel__panel-titile">Цвет кисти</div>
                    <div className="brush-panel__inputs-block">
                        <input onChange = {changeColorInputsHandler} value={ColorHelper.toHex(props.brushColor)} type="color" />
                        <input value={ColorHelper.toHex(props.brushColor)} type="text" />
                    </div>
                    <button onClick={saveBrushHandler} className='panel__block-button'>Сохранить</button>
                </div>
                <SavedColors/>
        </div>
    )
}


function mapStateToProps(state){
    return {
        brushSize: state.brush.size,
        brushColor: state.brush.color,
        brushAlpha: state.brush.alpha,
        savedBrushes: state.brush.savedBrushes
    }
}

export default connect(mapStateToProps)(BrushPanel);