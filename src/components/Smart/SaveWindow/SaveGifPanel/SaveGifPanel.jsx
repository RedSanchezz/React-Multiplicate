import React, {useState} from 'react';
import InputsBlock from '../../../Dump/InputsBlock/InputsBlock';
import './SaveGifPanel.scss';
import GIF from 'gif.js'
import {connect} from 'react-redux';

function SaveGifPanel(props) {

    const [repeat, setRepeat] = useState(0);
    const [quality, setQuality] = useState(10);
    const [background, setBackground] = useState('#ffffff');

    function saveGifHandler() {
        let frameList = props.frameList;
        if(frameList.length===0) {
            alert('Список фреймов пуст !');
            return;
        }
        console.log(background);

        let gif = new GIF({
            workers: 2,
            quality,
            repeat,
            background: background,
            transparent: null
        });
        frameList.forEach((frame, index)=>{
            gif.addFrame(frame.getCanvas(), {delay: frame.getDelay(), copy: true})
        })
        gif.on('finished', function(blob) {
            alert('ПОБЕДА !')
            window.open(URL.createObjectURL(blob));
        });
        gif.render();
    }


    return (
        <div className='save-gif-panel'>
            <div className='save-gif-panel__row'>
                <div className='save-gif-panel__item'>
                    <h4>Количество повторений для gif. Если -1, то без повторений. Если 0 - повторять бесконечно </h4>
                    <InputsBlock
                        title='Повторения'
                        max='1000'
                        min = '-1'
                        step='1'
                        value = {repeat}
                        onChange={(e)=> setRepeat(e.currentTarget.value)}
                    />
                </div>
                <div className='save-gif-panel__item'>
                    <h4>Интервал выборки пикселей. Чем меньше, тем лучше</h4>
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
                <button onClick={saveGifHandler}>Сохранить !</button>
            </div>
        </div>
    );
}

function mapStateToProps(state){
    return {
        frameList: state.frames.frameList
    }

}
export default connect(mapStateToProps)(SaveGifPanel);