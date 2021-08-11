import React, {useState} from 'react';
import './SaveImagePanel.scss';
import {connect} from 'react-redux';
import InputsBlock from '../../../Dump/InputsBlock/InputsBlock';

function SaveImagePanel(props) {

    let [height, setHeight] = useState(props.height);
    let [width, setWidth] = useState(props.width);
    let [saveProportion, setSaveProportion] = useState(true);

    function onClickSaveBtnHandler() {
        let tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = width;
        tmpCanvas.height = height;

        let tmpCtx = tmpCanvas.getContext('2d');

        tmpCtx.drawImage(props.canvas, 0, 0, width, height);

        let dataURL = tmpCanvas.toDataURL();

        let a = document.createElement('a');
        a.download='test';
        a.href = dataURL;
        a.click();

    }

    function changeImageHeightHandler(e) {
        setHeight(e.currentTarget.value);
        saveProportion && setWidth(e.currentTarget.value * props.width / props.height);

    }
    function changeImageWidthHandler(e) {
        setWidth(e.currentTarget.value);
        saveProportion && setHeight(e.currentTarget.value * props.height / props.width);
    }



    return (
        <div className='save-image-panel'>
            <h3>Размер</h3>
            <div className='save-image-panel__row'>
                <span>Сохранять пропорции</span>
                <input checked={saveProportion} onChange={(e)=>{setSaveProportion(e.currentTarget.checked)}} type='checkbox'/>
            </div>
            <div className='save-image-panel__row'>
                <div className='save-image-panel__column'>
                    <InputsBlock title='Высота' min='0' max={props.height} value={height} onChange={changeImageHeightHandler}/>
                </div>
                <div className='save-image-panel__column'>
                    <InputsBlock title='Ширина' min='0' max={props.width} value={width} onChange={changeImageWidthHandler}/>
                </div>
            </div>
            <div className='save-jpg-panel__row row'>
                <button onClick ={onClickSaveBtnHandler} className='save-image-panel__save-btn'>Сохранить !</button>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        canvas: state.canvas.canvas,
        height: state.canvas.size.height,
        width: state.canvas.size.width

    }
}
export default connect(mapStateToProps)(SaveImagePanel);