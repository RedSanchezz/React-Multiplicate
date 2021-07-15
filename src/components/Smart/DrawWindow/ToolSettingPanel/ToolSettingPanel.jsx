import React from 'react';
import {connect} from 'react-redux';
import BrushPanel from './BrushSettingPanel/BrushSettingPanel';
import HandToolPanel from './HandToolSettingPanel/HandToolSettingPanel';

function ToolSettingPanel(props) {
    if (props.currentToolName === 'HAND') {
        return <HandToolPanel></HandToolPanel>;
    }
    return <BrushPanel></BrushPanel>;
}

function mapStateToProps(state) {
    return {
        currentToolName: state.canvas.currentToolName
    };
}

export default connect(mapStateToProps)(ToolSettingPanel);