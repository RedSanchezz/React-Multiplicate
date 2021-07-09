
import React  from 'react'
import { Suspense } from 'react';
import MultiplicateManager from '../../../paint/MultiplicateManager/MultiplicateManager';

export default function MultiplicateRightPanel() {
    const Frames = React.lazy(()=>import('../../DrawWindow/RightPanel/Frames/Frames'));

    function testButtonClick(){
        MultiplicateManager.createGroupFrames();
    }

    return (
        <div className="right-panel">
            <button onClick = {testButtonClick}>
                Click me pls
            </button>
            <Suspense fallback={<h1>Загрузка..</h1>}>
                <Frames></Frames>
            </Suspense>
        </div>
    )
}