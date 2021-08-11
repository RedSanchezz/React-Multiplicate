import React, {useState} from 'react';
import FrameButtons from './FrameButtons/FrameButtons';
import FramesInputs from './FramesInputs/FramesInputs';
import './FrameTopPanelContent.scss';
import FrameManager from '../../../../Managers/FrameManager/FrameManager';

export default function FrameTopPanelContent() {
    let [delay, setDelay] = useState(100);

    function setDelayToAllHandler() {
        FrameManager.setDelayToAll(delay);
    }

    return (
        <>
            <div className="top-panel-content">
                <FrameButtons></FrameButtons>
                <FramesInputs></FramesInputs>
                <div className='top-panel-content__delay-all-block'>
                    <h3>Установить задержку для все слоев</h3>
                    <input type='number'
                           value={delay}
                           onChange={(e) => {
                               setDelay(e.currentTarget.value);
                           }}></input>
                    <button onClick={setDelayToAllHandler}>
                        OK
                    </button>
                </div>
            </div>
        </>
    );
}
