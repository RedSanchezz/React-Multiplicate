import React from 'react';

import { connect } from 'react-redux';
import LayoutManager from '../../../../paint/LayoutManager/LayoutManager';

import Layout from './Layout/Layout';
import './Layouts.scss';
import MultiplicateManager from './../../../../paint/MultiplicateManager/MultiplicateManager';
import LayoutModel from './../../../../paint/LayoutManager/Layout';




function Layouts(props) {

    function addLayoutHandler(){
        LayoutManager.addLayout();
    }
    function cancelSelection(){
        LayoutManager.unSelectAll();
    }
    function addToMultiplication(e){
        //Обычный слой из модели, просто нужно было другое название в импорте
        let layout = new LayoutModel(props.canvas, props.context, true);
        MultiplicateManager.addFrame(layout, 100);
    }
    return (
        <>
            <div className='right-panel__layout-buttons'>
                <button onClick={addLayoutHandler}>Добавить слой</button>
                <button onClick={addToMultiplication}>Добавить для мульта</button>
            </div>
            <div  className='right-panel__layout-list'>
                {
                    props.layoutList.map((value, index) => {
                        return <Layout key={index} value={value} index={index}></Layout>
                    })
                }
            </div>
        </>
    )

}

function mapStateToProps(state){
    return {
        layoutList: state.layouts.layoutList,
        canvas: state.canvas.canvas,
        context: state.canvas.context
        
    }
}

export default connect(mapStateToProps)(Layouts);
