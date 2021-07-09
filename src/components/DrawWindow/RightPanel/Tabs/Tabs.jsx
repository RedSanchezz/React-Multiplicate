
import React, { useEffect, useState } from 'react'

import './Tabs.scss';

import Layouts from '../Layouts/Layouts';
import Frames from '../Frames/Frames';


export default function Tabs(props) {
    let [tabsNumber, setTabsActive] = useState(0);
    const setContent = props.setContent;

    useEffect(() => {
        switch(tabsNumber){
            case 0: {
                setContent(<Layouts></Layouts>);
                break;
            }
            case 1: {
                setContent('history');
                break;
            }
            case 2: {
                setContent(<Frames></Frames>);
                break;
            }
            default: {
            }
        }
    }, [tabsNumber, setContent]);


    return (
        <>  
            <div className='right-panel__tabs'>
                <button onClick={()=>{setTabsActive(0)}} 
                        className={tabsNumber===0 ? 'right-panel__tabs-button active' : 'right-panel__tabs-button'}>
                        Слои
                </button>
                <button onClick={()=>{setTabsActive(1)}} 
                        className={tabsNumber===1 ? 'right-panel__tabs-button active' : 'right-panel__tabs-button'}>
                        История
                </button>
                <button onClick={()=>{setTabsActive(2)}}
                        className={tabsNumber===2 ? 'right-panel__tabs-button active' : 'right-panel__tabs-button'}>
                        Избранное
                </button>
            </div>
        </>
    )
}
