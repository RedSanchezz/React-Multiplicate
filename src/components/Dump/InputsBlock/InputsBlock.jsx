import React from 'react';
import './InputsBlock.scss'

function InputsBlock(props) {
    return (
        <div className="brush-panel__block size-block">
            <div className="brush-panel__panel-titile">{props.title}</div>
            <div className="brush-panel__inputs-block">
                <input min={props.min} max={props.max} step={props.step} onChange={props.onChange} value={props.value} type="number"/>
                <input min={props.min} max={props.max} step={props.step} onChange={props.onChange} value={props.value} type="range"/>
            </div>
        </div>
    );
}

export default InputsBlock;