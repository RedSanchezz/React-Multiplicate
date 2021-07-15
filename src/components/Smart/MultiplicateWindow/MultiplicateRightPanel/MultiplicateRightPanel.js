import React, {useState} from 'react';
import Frames from '../../DrawWindow/RightPanelContent/Frames/Frames';
import FrameManager from '../../../../Managers/FrameManager/FrameManager';

export default function MultiplicateRightPanel() {

    let [delay, setDelay] = useState(100);

    function setDelayToAllHandler() {
        FrameManager.setDelayToAll(delay);
    }

    return (
        <div className="right-panel">
            <div>
                <h3>Установить задержку для всех слоев</h3>
                <input type='number'
                       value={delay}
                       onChange={(e) => {
                           setDelay(e.currentTarget.value);
                       }}></input>
                <button onClick={setDelayToAllHandler}>
                    OK
                </button>

            </div>
            <Frames></Frames>
        </div>
    );
}