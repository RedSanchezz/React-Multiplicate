import React from 'react';

import { connect } from 'react-redux';
import LayoutManager from '../../../../paint/LayoutManager/LayoutManager';

import Layout from './Layout/Layout';
import './Layouts.scss';




function Layouts(props) {

    function addLayoutHandler(){
        LayoutManager.addLayout();
    }
    function cancelSelection(){
        LayoutManager.unSelectAll();
    }

    return (
        <>  
            {console.log('render parent')}
            <div className='right-panel__layout-buttons'>
                <button onClick={addLayoutHandler}>Добавить слой</button>
                <button onClick={cancelSelection}>Отменить выделение</button>
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
    }
}

export default connect(mapStateToProps)(Layouts);
