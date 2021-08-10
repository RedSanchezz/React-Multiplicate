import React from 'react';
import InputsBlock from '../../../../Dump/InputsBlock/InputsBlock';
import ToolManager from '../../../../../Managers/ToolManager/ToolManager';
import {connect} from 'react-redux';



function EraserSettingPanel(props) {

    function changeSizeInputsHandler(e) {
        let tool = ToolManager.getTool();
        tool.setSize(e.target.value);
    }

    return (
        <div>
            <InputsBlock title='Размер ластика'
                         value ={props.brushSize}
                         onChange={changeSizeInputsHandler}
                         max='250' min='0' step={'1'}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        brushSize: state.brush.size,
    }
}

export default connect(mapStateToProps)(EraserSettingPanel);