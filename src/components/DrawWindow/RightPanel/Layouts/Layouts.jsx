import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import LayoutManager from '../../../../paint/LayoutManager/LayoutManager';
import Layout from './Layout/Layout';
import './Layouts.scss';
import MultiplicateManager from './../../../../paint/MultiplicateManager/MultiplicateManager';
import LayoutModel from './../../../../paint/LayoutManager/Layout';
import LayoutMenu from './LayoutMenu';
import  ReactDOM  from 'react-dom';


function Layouts(props) {

    let menuBlock = React.createRef();

    let [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    let [active, setMenuActive] = useState(false);


    function addLayoutHandler(){
        LayoutManager.addLayout();
    }
    
    function addToMultiplication(e){
        //Обычный слой из модели, просто нужно было другое название в импорте
        let layout = new LayoutModel(props.canvas, props.context, true, ++LayoutManager.id);
        MultiplicateManager.addFrame(layout, 100);
    }

    useEffect(() => {

    })
    
    let layoutMenu = <LayoutMenu ref={menuBlock}
                    menuPosition={menuPosition} 
                    active={active} 
                    setMenuActive={setMenuActive}
                    layoutList = {props.layoutList}
                    ></LayoutMenu>;
    return (
        <>
            <div className='right-panel__layout-buttons'>
                <button onClick={addLayoutHandler}>Добавить слой</button>
                <button onClick={addToMultiplication}>Добавить для мульта</button>
            </div>
            {ReactDOM.createPortal(layoutMenu, document.getElementById('root'))}
            <div className='right-panel__layout-list'>
                {
                    props.layoutList.map((value, index) => {
                        return <Layout key={value.getId()} 
                                    value={value} 
                                    index={index} 
                                    isCurrent={index===props.currentLayoutIndex}
                                    isHidden={value.isHidden()}
                                    isSelected={value.isSelected()}
                                    setMenuPosition = {setMenuPosition}
                                    setMenuActive ={setMenuActive}
                                    >
                                </Layout>
                    })
                }
            </div>
        </>
    )

}

function mapStateToProps(state){
    return {
        layoutList: state.layouts.layoutList,
        currentLayoutIndex: state.layouts.currentLayoutIndex,
        canvas: state.canvas.canvas,
        context: state.canvas.context
    }
}

export default connect(mapStateToProps)(Layouts);
// 00371-853-3076273-85245
// CT7MR-7YRGY-WJBYX-RB8Q2-Q3GQC
