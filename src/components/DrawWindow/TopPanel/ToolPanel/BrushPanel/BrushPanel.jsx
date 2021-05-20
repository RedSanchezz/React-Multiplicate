
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveBrush } from '../../../../../redux/actionCreators/brushActionCreators';
import ColorHelper from '../../../../../utils/ColorHelper';
import './BrushPanel.scss';
import { changeSavedBrushes } from '../../../../../redux/actionCreators/brushActionCreators';


function BrushPanel(props) {

    let brushMenu = useRef();
    let colorIndex =null;

    function brushSizeHandler(e){
        let tool = props.toolManager.getTool();
        tool.setSize(e.target.value);
    }

    function brushColorHandler(e){
        let tool = props.toolManager.getTool();
        tool.setColor(e.target.value);
    }

    function brushAlphaHandler(e){
        let tool = props.toolManager.getTool();
        tool.setAlpha(e.target.value);
    }

    function saveBrushHandler(e){
        props.saveBrush({color: props.brushColor, alpha: props.brushAlpha, size: props.brushSize})
    }

    function changeBrushHandler(index){
        let brushSetting = props.savedBrushes[index];
        let tool = props.toolManager.getTool();
        console.log(brushSetting);
        tool.setColor(brushSetting.color);
        tool.setSize(brushSetting.size);
        tool.setAlpha(brushSetting.alpha);
    }


    function contextMenuColorHandler(e, index){
        colorIndex=index;
        brushMenu.current.classList.add('active');
        let domRect = e.target.getBoundingClientRect();
        console.log(domRect.left);
        brushMenu.current.style.top=domRect.top+'px';
        brushMenu.current.style.left=domRect.left+'px';
        brushMenu.current.addEventListener('mouseleave', mouseLeave);
        e.preventDefault();
        let timeOutId;

        //Ставим таймаут что бы само закрылось
        timeOutId= setTimeout(() => {
            brushMenu.current.classList.remove('active');
        }, 500);

        //Если зашли мышкой в меню - отключаем таймаут
        brushMenu.current.addEventListener('mouseenter', (e) => {
            clearTimeout(timeOutId);
            brushMenu.current.classList.add('active');
        })

        //Вышли из меню - включаем таймаут
        function mouseLeave(){
            brushMenu.current.classList.add('fastRemove');
            brushMenu.current.classList.remove('active');
            //без таймаута браузер может добавлять и убирать класы за "1 круг"
            setTimeout(() => {
                brushMenu.current.classList.remove('fastRemove');
            }, 0);
        }
    }

    function deleteColorHandler(){
        props.savedBrushes.splice(colorIndex, 1);
        props.changeSavedBrushes(props.savedBrushes);
        brushMenu.current.classList.add('fastRemove');
        brushMenu.current.classList.remove('active');
        //без таймаута браузер может добавлять и убирать класы за "1 круг"
        setTimeout(() => {
            brushMenu.current.classList.remove('fastRemove');
        }, 0);
    }

    function changeColorHandler(){
        props.savedBrushes[colorIndex].size=props.brushSize;
        props.savedBrushes[colorIndex].color=props.brushColor;
        props.savedBrushes[colorIndex].alpha=props.brushAlpha;

        props.changeSavedBrushes(props.savedBrushes);
        //После клика нужно убирать меню быстро
        brushMenu.current.classList.add('fastRemove');
        brushMenu.current.classList.remove('active');
        //без таймаута браузер может добавлять и убирать класы за "1 круг"
        setTimeout(() => {
            brushMenu.current.classList.remove('fastRemove');
        }, 0);
    }

    return (
        <div className="brush-panel">
                <div className="brush-panel__block size-block">
                    <div className="brush-panel__panel-titile">Размер кисти</div>
                    <div className="brush-panel__inputs-block">
                        <input min='0' max='200' onChange={brushSizeHandler} value={props.brushSize} type="number" />
                        <input min='0' max='200' onChange={brushSizeHandler} value={props.brushSize} type="range" />
                    </div>
                </div>
                <div className="brush-panel__block ">
                    <div className="brush-panel__panel-titile">Прозрачность</div>
                    <div className="brush-panel__inputs-block">
                        <input min='0' max='1' step='0.01' onChange={brushAlphaHandler} value={props.brushAlpha} type="number" />
                        <input min='0' max='1' step='0.01' onChange={brushAlphaHandler} value={props.brushAlpha} type="range" />
                    </div>
                </div>

                <div className="brush-panel__block">
                    <div className="brush-panel__panel-titile">Цвет кисти</div>
                    <div className="brush-panel__inputs-block">
                        <input onChange = {brushColorHandler} value={ColorHelper.toHex(props.brushColor)} type="color" />
                        <input value={ColorHelper.toHex(props.brushColor)} type="text" />
                    </div>
                    <button onClick={saveBrushHandler} className='panel__block-button'>Сохранить</button>
                </div>
                <div className="brush-panel__block">
                    <div className="brush-panel__panel-titile">Сохраненные кисти</div>
                    <div className='brush-panel__saved-brush'>
                        <div ref={brushMenu} className="brush-panel__saved-brush-menu ">
                            <div onClick={changeColorHandler} className="brush-panel__saved-brush-menu-item">Изменить</div>
                            <div onClick={deleteColorHandler} className="brush-panel__saved-brush-menu-item">Удалить</div>
                        </div>

                        {props.savedBrushes.map((value, index) => {
                            return <div 
                                    onClick={()=>{changeBrushHandler(index)}} 
                                    onContextMenu={(e)=>{contextMenuColorHandler(e, index)}}
                                    key={index} 
                                    style={{backgroundColor: value.color}} 
                                    className="brush-panel__saved-brush-item">
                                s:{value.size} o:{value.alpha}
                            </div>
                        })}

                    </div>
                </div>
        </div>
    )
}


function mapStateToProps(state){
    return {
        brushSize: state.brush.size,
        brushColor: state.brush.color,
        brushAlpha: state.brush.alpha,
        savedBrushes: state.brush.savedBrushes,
        toolManager: state.canvas.toolManager
    }
}

function mapDispatchToProps(dispatch){
    return {
        saveBrush: bindActionCreators(saveBrush, dispatch),
        changeSavedBrushes: bindActionCreators(changeSavedBrushes, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrushPanel);