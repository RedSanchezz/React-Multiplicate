import React from 'react';
import { connect } from 'react-redux';
import './RightPanel.scss';
import RightPanelDrawContent from './RightPanelDrawContent/RightPanelDrawContent';



function RightPanel() {    
    return (
        <div className="right-panel">
            <RightPanelDrawContent/> 
        </div>
    )
}

export default connect()(RightPanel);
