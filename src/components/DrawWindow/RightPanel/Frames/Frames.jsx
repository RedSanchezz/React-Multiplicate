

import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import FrameBlock from './FrameBlock/FrameBlock';
import './Frames.scss';

function Frames(props) {

    // let frames = React.createRef();

    return (
        <div className='right-panel__frames'>
            {console.log('render frames')}
            {props.frameList.map((value, index) => {
                return <FrameBlock key={value.id}  currentFrame={props.currentFrame} value={value} index={index}></FrameBlock>
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