import React from 'react';
import {connect} from 'react-redux';
import BrushPanel from './BrushSettingPanel/BrushSettingPanel';
import HandToolPanel from './HandToolSettingPanel/HandToolSettingPanel';
import ImageSettingPanel from './ImageSettingPanel/ImageSettingPanel';
import EraserSettingPanel from './EraserSettingPanel/EraserSettingPanel';

function ToolSettingPanel(props) {
    switch (props.currentToolName) {
        case 'HAND': {
            return <HandToolPanel></HandToolPanel>;
        }
        case 'ERASER': {
            return <EraserSettingPanel></EraserSettingPanel>;
        }
        case 'IMAGE': {
            return <ImageSettingPanel></ImageSettingPanel>;
        }
        case 'DRAG': {
            return <div></div>
        }
        default : {
            return <BrushPanel></BrushPanel>;
        }
    }
}

function mapStateToProps(state) {
    return {
        currentToolName: state.canvas.currentToolName
    };
}

export default connect(mapStateToProps)(ToolSettingPanel);