import React from 'react';
import {connect} from 'react-redux';
import FrameBlock from './FrameBlock/FrameItem';
import './Frames.scss';

function Frames(props) {
    return (
        <div className='right-panel__frames'>
            {

                props.frameList.map((value, index) => {
                    if (value.getType() === 'Frame') {
                        return <FrameBlock key={value.getId()}
                                           value={value}
                                           index={index}
                                           delay={value.getDelay()}
                                           isOpen={value.isOpen()}
                        >
                        </FrameBlock>;
                    } else {
                        return <div key={value.getId()}>Группа слоев : {value.getFrames().lenght}</div>;
                    }
                })}
            {console.log(props.frameList)}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        frameList: state.multiplicate.frameList
    };
}

export default connect(mapStateToProps)(Frames);