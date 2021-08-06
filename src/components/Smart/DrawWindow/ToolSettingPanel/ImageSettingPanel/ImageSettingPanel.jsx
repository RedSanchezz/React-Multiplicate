import React, {useState} from 'react';
import LayoutManager from '../../../../../Managers/LayoutManager/LayoutManager';
import {connect} from 'react-redux';
import {
    disableDragBlock, finish,
    imageToolSetFile,
    imageToolSetPosition
} from '../../../../../redux/actionCreators/imageToolActionCreator';
import './ImageSettingPanel.scss';

function ImageSettingPanel(props) {

    function onEnabledButtonClick(){
        props.finish();
    }
    function inputXCoordChange(e) {
        props.imageToolSetPosition({
            x: e.currentTarget.value,
            y: props.y,
            width: props.width,
            height: props.height
        })
    }
    function inputYCoordChange(e) {
        props.imageToolSetPosition({
            x: props.x,
            y: e.currentTarget.value,
            width: props.width,
            height: props.height
        })
    }
    function inputWidthChange(e) {
        props.imageToolSetPosition({
            x: props.x,
            y: props.y,
            width: e.currentTarget.value,
            height: props.height
        })
    }
    function inputHeightChange(e) {
        props.imageToolSetPosition({
            x: props.x,
            y: props.y,
            width: props.width,
            height: e.currentTarget.value
        })
    }

    return (
        <div>
            {props.dragBlockEnabled && <div>Enabled !</div>}
            {!props.dragBlockEnabled &&
            <div className='top-panel__image-tool image-tool'>
                <div>Disabled !</div>

                <button onClick={onEnabledButtonClick}>Set enabled !</button>
                <div className='image-tool__coords'>
                    <div className='image-tool__coords-row'>
                        <h3>X</h3>
                        <input type='number' value={props.x} onChange={inputXCoordChange} min={0} max={props.canvasWidth}/>
                        <input type='range' value={props.x} onChange={inputXCoordChange} min={0} max={props.canvasWidth} />
                    </div>
                    <div className='image-tool__coords-row'>
                        <h3>Y</h3>
                        <input type='number' value={props.y} onChange={inputYCoordChange}  min={0} max={props.canvasHeigth} />
                        <input type='range' value={props.y} onChange={inputYCoordChange} min={0} max={props.canvasHeigth}/>

                    </div>
                </div>
                <div className='image-tool__sizes'>
                    <div className='image-tool__coords-row'>
                        <h3>width</h3>
                        <input type='number' value={props.width} onChange={inputWidthChange} min={0} max={props.canvasWidth}/>
                        <input type='range' value={props.width} onChange={inputWidthChange} min={0} max={props.canvasWidth}/>

                    </div>
                    <div className='image-tool__coords-row'>
                        <h3>height</h3>
                        <input type='number' value={props.height} onChange={inputHeightChange} min={0} max={props.canvasHeigth}/>
                        <input type='range' value={props.height} onChange={inputHeightChange} min={0} max={props.canvasHeigth} />

                    </div>
                </div>
            </div>}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentLayout: state.layouts.currentLayout,
        dragBlockEnabled: state.imageTool.dragBlockEnabled,
        x: state.imageTool.position.x,
        y: state.imageTool.position.y,
        width: state.imageTool.position.width,
        height: state.imageTool.position.height,
        canvasHeigth: state.canvas.size.height,
        canvasWidth: state.canvas.size.width,
    }
}
export default connect(mapStateToProps,
    {disableDragBlock, imageToolSetFile, imageToolSetPosition, finish})
(ImageSettingPanel);