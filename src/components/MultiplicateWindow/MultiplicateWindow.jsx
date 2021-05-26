

import React from 'react'
import MultiplicateCanvasPanel from './MultiplicateCanvasPanel/MultiplicateCanvasPanel'
import MultiplicateLeftPanel from './MultiplicateLeftPanel/MultiplicateLeftPanel'
import MultiplicateRightPanel from './MultiplicateRightPanel/MultiplicateRightPanel'
import MultiplicateTopPanel from './MultiplicateTopPanel/MultiplicateTopPanel'

export default function MultiplicateWindow() {
    return (
        <div>
            <MultiplicateTopPanel></MultiplicateTopPanel>
            <MultiplicateRightPanel></MultiplicateRightPanel>
            <MultiplicateCanvasPanel></MultiplicateCanvasPanel>
            <MultiplicateLeftPanel></MultiplicateLeftPanel>
        </div>
    )
}
