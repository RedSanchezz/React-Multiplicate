import React from 'react';
import InputsBlock from '../../../../Dump/InputsBlock/InputsBlock';
import {connect} from 'react-redux';
import {changeEraserSetting} from '../../../../../redux/actionCreators/eraserActionCreator';



function EraserSettingPanel(props) {

    function changeSizeInputsHandler(e) {
        props.changeEraserSetting(e.target.value);
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
        brushSize: state.tool.eraser.size,
    }
}

export default connect(mapStateToProps, {changeEraserSetting})(EraserSettingPanel);