

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setCanvasZoom } from '../../../../../redux/actionCreators/canvasActionCreator'

function HandToolPanel(props) {

    function zoomChangeHandler(e){
        console.log(e.currentTarget);
        props.setCanvasZoom(e.currentTarget.value);
    }

    return (
        <div>
            <div>
                <input type="number" value={props.canvasZoom} onChange={zoomChangeHandler}  />
                <input onChange={zoomChangeHandler} 
                        value={props.canvasZoom}
                        type="range" step='0.1' min='0.1' max='5' 
                />
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        canvasZoom: state.canvas.zoom
    }
}

function mapDispatchToPorps(dispatch){
    return {
        setCanvasZoom: bindActionCreators(setCanvasZoom, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToPorps)(HandToolPanel)

