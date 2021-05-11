import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeCurrentLayout } from '../../../../../redux/actionCreators/layoutActionCreator';


function Layout(props) {

    let layout = props.value;
    let canvas = layout.getCanvas();

    let canvasJsx = getCanvas(canvas);
    let index = props.index;


    function hideLayoutHandler(e){
        props.layoutManager.toggleHide(index);
        props.changeCurrentLayout(props.currentLayout, index);
        e.stopPropagation();
    }

    function setCurrent(e){
        props.layoutManager.setCurrentLayout(index);
        e.stopPropagation();

    }

    
    function upHandler(e){
        props.layoutManager.swap(index, index-1);
        e.stopPropagation();

    }
    function downHandler(e){
        props.layoutManager.swap(index, index+1);
        e.stopPropagation();

    }

    function historyBackHandler(e){
        layout.back();
        props.layoutManager.update();
        props.layoutManager.render();
        e.stopPropagation();


    }
    function historyNextHandler(e){
        layout.next();
        props.layoutManager.update();
        props.layoutManager.render();
        e.stopPropagation();

    }

    function deleteLayoutHandler(e){
        props.layoutManager.deleteLayout(index);
        e.stopPropagation();

    }
    return (
            <React.Fragment>
                <div onClick={setCurrent} key={index} className='right-panel__layout-block layout-block'>
                    <div className='layout-block__left-menu'>
                        <div onClick={upHandler} className="layout-block__left-menu-item"><img src="/img/up.svg" alt="" /></div>
                        <div onClick={hideLayoutHandler} className="layout-block__left-menu-item">
                            {!layout.isHidden() ? <img src="/img/show.svg" alt="" /> : <img src="/img/hide.svg" alt="" />}
                        </div>
                        <div onClick={deleteLayoutHandler} className="layout-block__left-menu-item"><img src="/img/delete.svg" alt="" /></div>
                        <div onClick={downHandler} className="layout-block__left-menu-item"><img src="/img/up.svg" alt="" style={{transform: 'rotateX(180deg)'}} /></div>
                    </div>
                    <div className='layout-block__bottom-menu'>
                        <div className="layout-block__bottom-menu-item history">History</div>
                        <div onClick={historyBackHandler} className="layout-block__bottom-menu-item back"><img src="/img/up.svg" alt="" style={{transform: 'rotateZ(-90deg)'}} /></div>
                        <div onClick={historyNextHandler} className="layout-block__bottom-menu-item next"><img src="/img/up.svg" alt="" style={{transform: 'rotateZ(90deg)'}} /></div>
                    </div>
                    {canvasJsx}
                </div>
            </React.Fragment>
            )

    function getCanvas(canvas){   
        return (<canvas 
                    style={props.value===props.currentLayout ? {outline: '10px solid red'} : {}}
                    ref={(c) => {
                        let context = c?.getContext('2d');
                        if(context) {
                            context?.clearRect(0, 0, canvas.width, canvas.height);
                            context?.drawImage(canvas, 0, 0);
                        }
                    }} 
                    width={canvas.width} 
                    height={canvas.height}>
                </canvas>)
    }
}

function mapStateToProps(state){
    return {
        layoutList: state.layouts.layoutList,
        currentLayout: state.layouts.currentLayout,
        forRender: state.layouts,
        layoutManager: state.layouts.layoutManager
    }
}

function mapDispatchToProps(dispatch){
    return {
        changeCurrentLayout: bindActionCreators(changeCurrentLayout, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
