import React, { Component } from 'react';
import './Layout.scss';

export default class HideCurrentElementWarning extends Component {
    
    render() {
        return (
            <div className='hide-current-element-warning'>
                Выбранный вами слой скрыт !
            </div>
        )
    }
}
