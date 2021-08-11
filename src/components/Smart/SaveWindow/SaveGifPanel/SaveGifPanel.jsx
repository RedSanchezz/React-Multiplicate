import React, {useState} from 'react';
import InputsBlock from '../../../Dump/InputsBlock/InputsBlock';
import './SaveGifPanel.scss';
import GIF from 'gif.js';
import {connect} from 'react-redux';
import Preloader from '../../../Dump/Preloader/Preloader';

function SaveGifPanel(props) {

    const [repeat, setRepeat] = useState(0);
    const [quality, setQuality] = useState(10);


    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);


    const [background, setBackground] = useState('#ffffff');
    const [loading, setLoading] = useState(false);
    const [saveProportion, setSaveProportion] = useState(true);


    function saveGifHandler() {
        let frameList = props.frameList;
        if(frameList.length===0) {
            alert('Список фреймов пуст !');
            return;
        }
        setLoading(true);
        let gif = new GIF({
            workers: 2,
            quality,
            repeat,
        });

        frameList.forEach((frame, index)=>{
            setTimeout(()=>{
                let canvas = document.createElement('canvas');
                canvas.width=width;
                canvas.height=height;
                let ctx = canvas.getContext('2d');
                ctx.fillStyle = background;
                ctx.fillRect(0,0, width, height);
                ctx.drawImage(frame.getCanvas(), 0, 0, width, height);
                gif.addFrame(canvas, {delay: frame.getDelay(), copy: true});
            },0);
        });
        gif.on('finished', function(blob) {
            setLoading(false);
            let dataURL = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.download='test';
            a.href = dataURL;
            a.click();
        });

        setTimeout(()=>{
            gif.render();
        },0);



    }


    function heightChangeHandler(e){
        setHeight(e.currentTarget.value);
        saveProportion && setWidth(e.currentTarget.value * props.width / props.height);
    }
    function widthChangeHandler(e){
        setWidth(e.currentTarget.value);
        saveProportion && setHeight(e.currentTarget.value * props.height / props.width);
    }

    return (
        <div className='save-gif-panel-wrapper'>
            <div className='save-gif-panel'>
                <div className='save-gif-panel__row'>
                    <div className='save-gif-panel__column item'>
                        <h5>Количество повторений для gif. Если -1, то без повторений. Если 0 - повторять бесконечно </h5>
                        <InputsBlock
                            title='Повторения'
                            max='1000'
                            min = '-1'
                            step='1'
                            value = {repeat}
                            onChange={(e)=> setRepeat(e.currentTarget.value)}
                        />
                    </div>
                    <div className='save-gif-panel__column'>
                        <h5>Интервал выборки пикселей. Чем меньше, тем лучше</h5>
                        <InputsBlock
                            title='Качество'
                            max='100'
                            min = '1'
                            step='1'
                            value = {quality}
                            onChange={(e)=> setQuality(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className='save-gif-panel__row'>
                    <div className='save-gif-panel__column size'>
                        <div className='save-gif-panel__item'>
                            <h3>Размеры картинки</h3>
                            <span>Сохранять пропорции</span>
                            <input type='checkbox'
                                   checked={saveProportion}
                                    onChange={(e)=>{
                                        setSaveProportion(e.currentTarget.checked)
                                    }}/>
                        </div>
                        <div className='save-gif-panel__item'>
                            <InputsBlock
                                title='Ширина'
                                max='2000'
                                min = '0'
                                step='1'
                                value = {width}
                                onChange={widthChangeHandler}
                            />
                        </div>
                        <div className='save-gif-panel__item'>
                            <InputsBlock
                                title='Высота'
                                max='2000'
                                min = '0'
                                step='1'
                                value = {height}
                                onChange={heightChangeHandler}
                            />
                        </div>
                    </div>
                    <div className='save-gif-panel__column color'>
                        <h3>Цвет фона</h3>
                        <input className='save-gif-panel__color-input'
                                type='color'
                               value={background}
                               onChange={(e)=>{setBackground(e.currentTarget.value)}}/>
                    </div>
                </div>


                {props.frameList.length !==0  ?
                    <div className='save-gif-panel__row'>
                        <div className='save-gif-panel__save-btn-wrapper'>
                        {loading ? <Preloader/> : <button className='save-gif-panel__save-btn' onClick={saveGifHandler}>Сохранить !</button>}
                        </div>
                    </div> :
                    <div className='save-gif-panel__warning'>Список кадров пуст !</div>
                }
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return {
        frameList: state.frames.frameList,
        width: parseInt(state.canvas.size.width),
        height: parseInt(state.canvas.size.height),
    }
}
export default connect(mapStateToProps)(SaveGifPanel);