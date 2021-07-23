import React, {useState} from 'react';

import {connect} from 'react-redux';
import './Layouts.scss';
import LayoutModel from '../../../../../models/Layout';
import LayoutMenu from './LayoutMenu';
import ReactDOM from 'react-dom';
import LayoutManager from '../../../../../Managers/LayoutManager/LayoutManager';
import FrameManager from '../../../../../Managers/FrameManager/FrameManager';
import Layout from './Layout/Layout';

function Layouts(props) {

    let menuBlock = React.createRef();

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

    let layoutMenu = <LayoutMenu ref={menuBlock}
                                 menuPosition={menuPosition}
                                 active={active}
                                 setMenuActive={setMenuActive}
                                 layoutList={props.layoutList}
    />;

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
