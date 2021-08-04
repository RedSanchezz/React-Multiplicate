import React from 'react';
import {connect} from 'react-redux';
import BrushPanel from './BrushSettingPanel/BrushSettingPanel';
import HandToolPanel from './HandToolSettingPanel/HandToolSettingPanel';
import ImageSettingPanel from './ImageSettingPanel/ImageSettingPanel';

function ToolSettingPanel(props) {

    switch (props.currentToolName) {
        case 'HAND': {
            return <HandToolPanel></HandToolPanel>;
        }
        case 'IMAGE': {
            return <ImageSettingPanel></ImageSettingPanel>;
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