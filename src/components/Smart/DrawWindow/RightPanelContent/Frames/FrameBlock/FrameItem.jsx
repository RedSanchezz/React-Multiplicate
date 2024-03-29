import React, {useEffect} from 'react';
import './FrameItem.scss';
import {connect} from 'react-redux';
import FrameManager from '../../../../../../Managers/FrameManager/FrameManager';
import LayoutManager from '../../../../../../Managers/LayoutManager/LayoutManager';
import Layout from '../../../../../../models/Layout';

function FrameItem(props) {

    const value = props.value;
    const id = value.getId();

    const index = props.index;
    const refFrameBlock = React.createRef();

    useEffect(() => {
        if (props.isOpen) {
            refFrameBlock.current.prepend(value.getCanvas());
            value.getCanvas().style.backgroundColor = props.defaultBackgorund;
        }
        return () => {
            value.getCanvas().remove();
        };
    }, [id, props.defaultBackgorund, value, props.isOpen,  refFrameBlock]);


    function deleteFrameHandler(e) {
        FrameManager.deleteFrame(index);
        e.stopPropagation();
    }

    function changeDelayHandler(e) {
        let delay = e.currentTarget.value;
        value.setDelay(delay);
        FrameManager.changeFrame(index, value);
        e.stopPropagation();
    }

    function addToLayoutListHandler(e) {
        let canvas = document.createElement('canvas');
        canvas.width = value.getCanvas().width;
        canvas.height = value.getCanvas().height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(value.getCanvas(), 0, 0);

        let layout = new Layout(canvas, ctx, true, ++LayoutManager.id);
        props.layoutList.push(layout);
        LayoutManager.changeLayoutList(props.layoutList);
        e.stopPropagation();
    }

    function upPositionHandler(e) {
        FrameManager.swap(index, index - 1);
        e.stopPropagation();
    }

    function downPositionHandler(e) {
        FrameManager.swap(index, index + 1);
        e.stopPropagation();
    }

    function frameClickHandler(e) {
        if(e.ctrlKey){
            if(props.isSelected)  value.unSelect();
            else value.select();
            FrameManager.changeFrame();
            e.stopPropagation();
            return;
        }
        FrameManager.setСurrentFrameIndex(index);
    }

    function clickOpenHandler(e) {
        FrameManager.openCloseFrame(value);
        e.stopPropagation();
    }
    function onContextMenuHandler(e){
        if(props.isSelected){
            let x = e.pageY - 10;
            let y = e.pageX - 20;
            //если меню выезжает за правый край
            if (y + 200 >= window.innerWidth) {
                y = window.innerWidth - 200;
            }
            if (x + 200 >= window.innerHeight) {
                x = window.innerHeight - 200;
            }
            props.setMenuPosition({x, y});
            props.setMenuActive(true);
        }
        e.preventDefault();
        e.stopPropagation();
    }

    let className = props.isOpen ? 'frame-block opened' : 'frame-block';
    className = props.isSelected ? className + ' selected' : className;
    return (
        <div ref={refFrameBlock}
             className={className}
             style={props.currentFrameIndex === index ? {background: 'darkred'} : {}}
             onClick={frameClickHandler}
            onContextMenu={onContextMenuHandler}>
            <span className='frame-block__index'>{props.index + 1}</span>

            <div className='frame-block__open-close-btn'
                 onClick={clickOpenHandler}></div>

            <div className='frame-block__menu frame-menu'>
                <div onClickCapture={upPositionHandler} className="frame-menu__item">
                    <img src={process.env.PUBLIC_URL + "/img/up.svg"} alt=""/>
                </div>
                <div className="frame-menu__item">
                    <button onClickCapture={addToLayoutListHandler}>В слои</button>
                </div>
                <div onClickCapture={downPositionHandler} className="frame-menu__item down-arrow">
                    <img src={process.env.PUBLIC_URL + "/img/up.svg"} alt=""/>
                </div>
            </div>

            <div className="frame-block__input-block">
                <h2>Задержка</h2>
                <input onClickCapture={e => e.stopPropagation()}
                       value={value.getDelay()}
                       onChange={changeDelayHandler}
                       min='0' type="number"/>
            </div>
            <div className='frame-block__delete-btn'>
                <img onClickCapture={deleteFrameHandler} src={process.env.PUBLIC_URL + "/img/delete.svg"} alt=""/>
            </div>
        </div>
    );

}

function mapStateToPorps(state) {
    return {
        currentFrameIndex: state.frames.currentFrameIndex,
        defaultBackgorund: state.setting.canvasDefaultBackground,
        layoutList: state.layouts.layoutList
    };
}

export default connect(mapStateToPorps)(FrameItem);