import React, { useState } from 'react'
import { connect } from 'react-redux';
import './GifSettingPanel.scss';
import GIF from "gif.js"; 
import { NavLink } from 'react-router-dom';

function GifSettingPanel(props) {
    console.log(props.frameList);
    let [loader, setLoader] = useState(false);

    function onButtonClickHandler() {
        setLoader(true)
        let gif = new GIF({
            workers: 2,
            quality: 10
        });

        props.frameList.map((frame)=> {
            gif.addFrame(frame.getCanvas(), {delay: frame.getDelay()});
        });

        gif.on('finished', function(blob) {
            setLoader(false)

            window.open(URL.createObjectURL(blob));
        });
        gif.render();
    }

    return (
        <div className='gif-setting-panel'>
            <NavLink to='/draw' className='draw-button'>Draw</NavLink>
            <NavLink to='/multiplicate' className='frame-button'> Multiplicate</NavLink>

            {loader ?  <h1>Загрузка...</h1> : <button onClick={onButtonClickHandler}>Создать</button>} 
        </div>
    )
}
function mapStateToProps(state) {
    return {
        frameList: state.multiplicate.frameList
    }
}

export default connect(mapStateToProps)(GifSettingPanel);