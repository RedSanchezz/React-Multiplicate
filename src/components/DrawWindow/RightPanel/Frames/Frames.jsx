

import React from 'react'
import { connect } from 'react-redux';
import FrameBlock from './FrameBlock/FrameBlock';
import './Frames.scss';

function Frames(props) {
    return (
        <div className='right-panel__frames'>
            {console.log('render frames')}
            {props.frameList.map((value, index) => {
                return <FrameBlock key={value.getId()} value={value} index={index} delay={value.getDelay()}></FrameBlock>
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