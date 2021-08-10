import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {connect} from 'react-redux';
import FrameBlock from './FrameBlock/FrameItem';
import './Frames.scss';
import ContextMenu from '../../../../Dump/ContextMenu/ContextMenu';
import FrameManager from '../../../../../Managers/FrameManager/FrameManager';

function Frames(props) {

    let [menuActive, setMenuActive] = useState(false);
    let [menuPosition, setMenuPosition] = useState({x:'0px',y:'0px'});
    let [contextMenuDelay, setContextMenuDelay] = useState(100);


    //Устанвливаем задержку для выделенных слоев
    function clickContextBtnDelayHandler(e){
        setMenuActive(false);
        FrameManager.setDelaySelectedFrames(contextMenuDelay);
    }

    function unSelectAllFrame(){
        FrameManager.unSelectAllFrame();
    }

    function deleteSelectedFrame(){
        setMenuActive(false);
        if(window.confirm('Удалить выбранные кадры ?')) FrameManager.deleteSelectedFrame();
    }
    let FrameMenu = <ContextMenu active={menuActive}
                                 setMenuActive={setMenuActive}
                                 menuPosition={menuPosition}>
                        <div className='context-menu-item'>
                            <div>Установить задержку</div>
                            <div>
                                <input className='context-menu-item__input'
                                       value={contextMenuDelay}
                                       onChange={(e)=>{setContextMenuDelay(e.currentTarget.value)}}
                                       type='number'/>
                                       <button onClick={clickContextBtnDelayHandler}>OK</button>
                            </div>
                        </div>
                        <div className='context-menu-item'
                            onClick={deleteSelectedFrame}>Удалить выбранные</div>
                        <div className='context-menu-item'
                            onClick={unSelectAllFrame}>Отменить выделение</div>
                    </ContextMenu>;

    return (
        <div className='right-panel__frames'>
            {ReactDOM.createPortal(<>{FrameMenu}</>, document.getElementById('root'))}
            {
                props.frameList.map((value, index) => {
                        return <FrameBlock key={value.getId()}
                                           value={value}
                                           index={index}
                                           delay={value.getDelay()}
                                           isOpen={value.isOpen()}
                                           isSelected={value.isSelected()}
                                           setMenuActive={setMenuActive}
                                           setMenuPosition={setMenuPosition}
                        />
                        })}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        frameList: state.frames.frameList
    };
}

export default connect(mapStateToProps)(Frames);