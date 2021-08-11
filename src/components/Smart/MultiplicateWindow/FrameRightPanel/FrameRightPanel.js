import React, {useState} from 'react';
import Frames from '../../DrawWindow/RightPanelContent/Frames/Frames';
import FrameManager from '../../../../Managers/FrameManager/FrameManager';
import './FrameRightPanel.scss';
export default function FrameRightPanel() {

    let [delay, setDelay] = useState(100);

    function setDelayToAllHandler() {
        FrameManager.setDelayToAll(delay);
    }

    return (
        <>
            <div className='right-panel__top-block'>
                <h2 >Список слоев</h2>
            </div>
            <Frames></Frames>
        </>
    );
}