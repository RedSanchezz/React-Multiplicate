import React from 'react';
import { connect } from 'react-redux';
import './RightPanel.scss';
import Tabs from './Tabs/Tabs';

function RightPanel(props) {
    return (
        <div className="right-panel">
            <Tabs></Tabs>
        </div>
    )
}


export default connect()(RightPanel);
