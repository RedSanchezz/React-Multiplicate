import React, {useRef} from 'react';
import {connect} from 'react-redux';
import ToolManager from '../../../../../../Managers/ToolManager/ToolManager';
import './SavedBrushes.scss';

function SavedColors(props) {

    let colorIndex = null;
    let brushMenu = useRef();

    function deleteButtonHandler() {
        props.savedBrushes.splice(colorIndex, 1);
        ToolManager.changeSavedBrushes(props.savedBrushes);
        brushMenu.current.classList.add('fastRemove');
        brushMenu.current.classList.remove('active');
    }

    function changeButtonHandler() {
        props.savedBrushes[colorIndex].size = props.brushSize;
        props.savedBrushes[colorIndex].color = props.brushColor;
        props.savedBrushes[colorIndex].alpha = props.brushAlpha;

        ToolManager.changeSavedBrushes(props.savedBrushes);
        //После клика нужно убирать меню быстро
        brushMenu.current.classList.add('fastRemove');
        brushMenu.current.classList.remove('active');
        //без таймаута браузер может добавлять и убирать класы за "1 круг"
        setTimeout(() => {
            brushMenu.current.classList.remove('fastRemove');
        }, 0);
    }

    function colorRightClickHandler(e, index) {
        colorIndex = index;
        brushMenu.current.classList.add('active');
        let domRect = e.target.getBoundingClientRect();
        brushMenu.current.style.top = domRect.top + 'px';
        brushMenu.current.style.left = domRect.left + 'px';
        brushMenu.current.addEventListener('mouseleave', mouseLeave);
        e.preventDefault();
        let timeOutId;

        //Ставим таймаут что бы само закрылось
        timeOutId = setTimeout(() => {
            brushMenu.current.classList.remove('active');
        }, 500);

        //Если зашли мышкой в меню - отключаем таймаут
        brushMenu.current.addEventListener('mouseenter', (e) => {
            clearTimeout(timeOutId);
            brushMenu.current.classList.add('active');
        });

        //Вышли из меню - включаем таймаут
        function mouseLeave() {
            brushMenu.current.classList.add('fastRemove');
            brushMenu.current.classList.remove('active');
            //без таймаута браузер может добавлять и убирать класы за "1 круг"
            setTimeout(() => {
                brushMenu.current.classList.remove('fastRemove');
            }, 0);
        }
    }

    function changeBrushHandler(index) {
        let brushSetting = props.savedBrushes[index];
        let tool = ToolManager.getTool();
        tool.setColor(brushSetting.color);
        tool.setSize(brushSetting.size);
        tool.setAlpha(brushSetting.alpha);
    }

    return (
        <>
            {props.savedBrushes.length!==0 &&
            <div className="brush-panel__block saved-brush">
                <div className="brush-panel__panel-title">Сохраненные кисти</div>
                <div className='brush-panel__saved-brush'>
                    <div ref={brushMenu} className="brush-panel__saved-brush-menu ">
                        <div onClick={changeButtonHandler} className="brush-panel__saved-brush-menu-item">Изменить</div>
                        <div onClick={deleteButtonHandler} className="brush-panel__saved-brush-menu-item">Удалить</div>
                    </div>
                    {props.savedBrushes.map((value, index) => {
                        return <div
                            onClick={() => {
                                changeBrushHandler(index);
                            }}
                            onContextMenu={(e) => {
                                colorRightClickHandler(e, index);
                            }}
                            key={index}
                            style={{backgroundColor: value.color}}
                            className="brush-panel__saved-brush-item">
                            s:{value.size} o:{value.alpha}
                        </div>;
                    })}
                </div>
            </div>}
        </>
    );
}

function mapStateToProps(state) {
    return {
        brushSize: state.brush.size,
        brushColor: state.brush.color,
        brushAlpha: state.brush.alpha,
        savedBrushes: state.brush.savedBrushes
    };
}


export default connect(mapStateToProps)(SavedColors);