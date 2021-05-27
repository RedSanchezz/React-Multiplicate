
import React  from 'react'
import { Suspense } from 'react';

export default function MultiplicateRightPanel() {
    const Frames = React.lazy(()=>import('../../DrawWindow/RightPanel/Frames/Frames'));
    return (
        <div className="right-panel">
        <Suspense fallback={<h1>Загрузка..</h1>}>
            <Frames></Frames>
        </Suspense>
        </div>
    )
}