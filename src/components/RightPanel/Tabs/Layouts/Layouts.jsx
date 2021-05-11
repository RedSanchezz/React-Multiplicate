import React from 'react';
import { connect } from 'react-redux';

import Layout from './Layout/Layout';
import './Layouts.scss';

function Layouts(props) {

    function addLayoutHandler(){
        props.layoutManager.addLayout();
    }
    return (
        <div>
            <div className='right-panel__layout-buttons'>
                <button onClick={addLayoutHandler}>Добавить слой</button>
                <button>Отменить выделение</button>
            </div>
            <div className='right-panel__layout-list'>
                {
                    props.layoutList.map((value, index) => {
                        return <Layout key={index} value={value} index={index}></Layout>
                    })
                }
            </div>
        </div>
    )

}

function mapStateToProps(state){
    return {
        layoutList: state.layouts.layoutList,
        currentLayout: state.layouts.currentLayout,
        forRender: state.layouts,
        layoutManager: state.layouts.layoutManager
    }
}



export default connect(mapStateToProps)(Layouts);
