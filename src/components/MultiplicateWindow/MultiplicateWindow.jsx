

import React from 'react'
import MultiplicateCanvasPanel from './MultiplicateCanvasPanel/MultiplicateCanvasPanel'
import MultiplicateLeftPanel from './MultiplicateLeftPanel/MultiplicateLeftPanel'
import MultiplicateRightPanel from './MultiplicateRightPanel/MultiplicateRightPanel'
import MultiplicateTopPanel from './MultiplicateTopPanel/MultiplicateTopPanel'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function MultiplicateWindow(props) {
    return (
        <div>
            <MultiplicateTopPanel></MultiplicateTopPanel>
            <MultiplicateRightPanel></MultiplicateRightPanel>
            <MultiplicateCanvasPanel></MultiplicateCanvasPanel>
            <MultiplicateLeftPanel></MultiplicateLeftPanel>
        </div>
    )
}

