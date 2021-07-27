import React from 'react';
import './Preloader.scss'
import preloader from'./img/preloader.gif';

function Preloader(props) {
    return (
        <div className='preloader'>
            <h2>Идет загрузка...</h2>
            <img className='preloader__img' src={preloader} alt=""/>
        </div>
    );
}

export default Preloader;