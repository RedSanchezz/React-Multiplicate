import React from 'react';
import './CenterSpace.scss';


function CenterSpace(props) {
    return (
        <div className='center-space'>
            {props.children}
        </div>
    );
}

export default CenterSpace;