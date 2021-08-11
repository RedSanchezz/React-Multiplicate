import React from 'react';
import {connect} from 'react-redux';
import {
    disableDragBlock, finish,
    setFile,
    setPosition
} from '../../../../../redux/actionCreators/imageToolActionCreator';
import './ImageSettingPanel.scss';

function ImageSettingPanel(props) {

    function onEnabledButtonClick(){
        props.finish();
    }

    function inputXCoordChange(e) {
        props.setPosition({
            x: e.currentTarget.value,
            y: props.y,
            width: props.width,
            height: props.height
        })
    }
    function inputYCoordChange(e) {
        props.setPosition({
            x: props.x,
            y: e.currentTarget.value,
            width: props.width,
            height: props.height
        })
    }
    function inputWidthChange(e) {
        props.setPosition({
            x: props.x,
            y: props.y,
            width: e.currentTarget.value,
            height: props.height
        })
    }
    function inputHeightChange(e) {
        props.setPosition({
            x: props.x,
            y: props.y,
            width: props.width,
            height: e.currentTarget.value
        })
    }

    return (
        <div>
            {props.dragBlockEnabled && <div></div>}
            {!props.dragBlockEnabled &&
            <div className='top-panel__image-tool image-tool'>
                <div className='image-tool__ block coords'>
                    <div className='image-tool__block-row'>
                        <h3>X</h3>
                        <div className='image-tool__inputs'>
                            <input type='number' value={props.x} onChange={inputXCoordChange} min={0} max={props.canvasWidth}/>
                            <input type='range' value={props.x} onChange={inputXCoordChange} min={0} max={props.canvasWidth} />
                        </div>
                    </div>
                    <div className='image-tool__block-row'>
                        <h3>Y</h3>
                        <div className='image-tool__inputs'>
                            <input type='number' value={props.y} onChange={inputYCoordChange}  min={0} max={props.canvasHeigth} />
                            <input type='range' value={props.y} onChange={inputYCoordChange} min={0} max={props.canvasHeigth}/>
                        </div>
                    </div>
                </div>
                <div className='image-tool__ block sizes'>
                    <div className='image-tool__block-row'>
                        <h3>ширина</h3>
                        <div className='image-tool__inputs'>
                            <input type='number' value={props.width} onChange={inputWidthChange} min={0} max={props.canvasWidth}/>
                            <input type='range' value={props.width} onChange={inputWidthChange} min={0} max={props.canvasWidth}/>
                        </div>
                    </div>
                    <div className='image-tool__block-row'>
                        <h3>высота</h3>
                        <div className='image-tool__inputs'>
                            <input type='number' value={props.height} onChange={inputHeightChange} min={0} max={props.canvasHeigth}/>
                            <input type='range' value={props.height} onChange={inputHeightChange} min={0} max={props.canvasHeigth} />
                        </div>
                    </div>
                </div>
                <button onClick={onEnabledButtonClick}>Вставить изображение</button>
            </div>}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentLayout: state.layouts.currentLayout,
        dragBlockEnabled: state.tool.image.dragBlockEnabled,
        x: state.tool.image.position.x,
        y: state.tool.image.position.y,
        width: state.tool.image.position.width,
        height: state.tool.image.position.height,
        canvasHeigth: state.canvas.size.height,
        canvasWidth: state.canvas.size.width,
    }
}
export default connect(mapStateToProps,
    {disableDragBlock, setFile, setPosition, finish})
(ImageSettingPanel);