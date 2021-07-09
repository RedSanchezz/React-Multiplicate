
import React from 'react'
import { connect } from 'react-redux';
import BrushPanel from './BrushPanel/BrushPanel'
import HandToolPanel from './HandToolPanel/HandToolPanel';

function ToolPanel(props) {
    if(props.currentToolName === 'HAND')
    {
        return <HandToolPanel></HandToolPanel>
    }
    return <BrushPanel></BrushPanel>;
}

function mapStateToProps(state){
    return {
        currentToolName: state.canvas.currentToolName
    }
}
export default connect(mapStateToProps)(ToolPanel);