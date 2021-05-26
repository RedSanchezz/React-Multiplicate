

import React, { Suspense, useEffect } from 'react'
import { connect } from 'react-redux';
// import FrameBlock from './FrameBlock/FrameBlock';
import './Frames.scss';

function Frames(props) {
    const FrameBlock = React.lazy(()=> import('./FrameBlock/FrameBlock'));

    // let frames = React.createRef();
    // useEffect(()=>{
    //     // console.log('effect');
    //     // console.log(frames.current.scrollTop);
    //     // if(props.currentFrame <= 1) frames.current.scrollTop =0;
    //     // else frames.current.scrollTop = (props.currentFrame-1)*336;
    // }, [props.currentFrame]);

    return (
    
        <div className='right-panel__frames'>
            {console.log('render frames')}
            {props.frameList.map((value, index) => {
                return <Suspense fallback={<h1>Загрузка...</h1>}>
                            <FrameBlock key={value.id}  currentFrame={props.currentFrame} value={value} index={index}></FrameBlock>
                        </Suspense>
            })}
        </div>
    )
}


function mapStateToProps(state){
    return {
        frameList: state.multiplicate.frameList,
    }
}
export default connect(mapStateToProps)(Frames);