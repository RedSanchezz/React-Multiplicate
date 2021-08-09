import React, {useState} from 'react';

import {connect} from 'react-redux';
import './Layouts.scss';
import LayoutModel from '../../../../../models/Layout';
import ReactDOM from 'react-dom';
import LayoutManager from '../../../../../Managers/LayoutManager/LayoutManager';
import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import Layout from './Layout/Layout';
import ContextMenu from '../../../../Dump/ContextMenu/ContextMenu';

function Layouts(props) {

    let [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    let [active, setMenuActive] = useState(false);


    function addLayoutHandler() {
        //Обычный слой из модели
        let layout = new LayoutModel(props.canvas, props.context, true, ++LayoutManager.id);
        LayoutManager.addLayout(layout);
    }

    function addToMultiplication(e) {
        //Обычный слой из модели, просто нужно было другое название в импорте
        let layout = new LayoutModel(props.canvas, props.context, true, ++LayoutManager.id);
        FrameManager.addFrame(layout, 100);
    }

    function deleteSelectedHandler(e) {
        setMenuActive(false);
        let indexArray = [];
        console.log(props.layoutList);
        props.layoutList.map((value, index) => {
            if (value.isSelected()) indexArray.push(index);
            return value;
        });
        LayoutManager.deleteSelectedLayouts(indexArray);
    }

    function combineSelectedHandler(e) {
        LayoutManager.combineSelected();
        setMenuActive(false);
        // let indexArray = [];
        // props.layoutList.map((value, index) => {
        //     if (value.isSelected()) indexArray.push(index);
        //     return value;
        // });
        // LayoutManager.combine(indexArray);
    }

    function unselectAllHandler() {
        LayoutManager.unSelectAll();
    }
    function copyLayout(){
        LayoutManager.copyLayouts();
    }

    let layoutMenu = <ContextMenu setMenuActive={setMenuActive}
                                  active={active}
                                  menuPosition={menuPosition}
    >
        <div onClick={copyLayout} className="right-panel__context-menu-item">Копировать</div>
        <div onClick={deleteSelectedHandler} className="right-panel__context-menu-item">Удалить выбранные</div>
        <div onClick={combineSelectedHandler} className="right-panel__context-menu-item">Обьеденить</div>
        <div onClick={unselectAllHandler} className="right-panel__context-menu-item">Отменить выделение</div>
    </ContextMenu>


    return (
        <>
            <div className='right-panel__layout-buttons'>
                <button onClick={addLayoutHandler}>Добавить слой</button>
                <button onClick={addToMultiplication}>Добавить в кадры</button>
            </div>
            {ReactDOM.createPortal(layoutMenu, document.getElementById('root'))}
            <div className='right-panel__layout-list'>
                {
                    props.layoutList.map((layout, index) => {
                        return <Layout key={layout.getId()}
                                       layout={layout}
                                       index={index}
                                       isCurrent={index === props.currentLayoutIndex}
                                       isHidden={layout.isHidden()}
                                       isSelected={layout.isSelected()}
                                       setMenuPosition={setMenuPosition}
                                       setMenuActive={setMenuActive}
                        />;
                    })
                }
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
        layoutList: state.layouts.layoutList,
        currentLayoutIndex: state.layouts.currentLayoutIndex,
        canvas: state.canvas.canvas,
        context: state.canvas.context
    };
}

export default connect(mapStateToProps)(Layouts);