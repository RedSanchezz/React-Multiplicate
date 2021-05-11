
import React, { useEffect, useState } from 'react'
import './Tabs.scss';
import Layouts from './Layouts/Layouts';
export default function Tabs() {
    let [tabsNumber, setTabsActive] = useState(0);
    let [content, setContent] = useState(<Layouts></Layouts>);

    useEffect(() => {
        switch(tabsNumber){
            case 0: {
                setContent(<Layouts></Layouts>);
                break;
            }
            case 1: {
                setContent('');
                break;

            }
            case 2: {
                setContent('');
                break;
            }
        }
    }, [tabsNumber]);


    return (
        <div>
            <div className='right-panel__tabs'>
                <button onClick={()=>{setTabsActive(0)}} className={tabsNumber===0 ? 'right-panel__tabs-button active' : 'right-panel__tabs-button'}>Слои</button>
                <button onClick={()=>{setTabsActive(1)}} className={tabsNumber===1 ? 'right-panel__tabs-button active' : 'right-panel__tabs-button'}>История</button>
                <button onClick={()=>{setTabsActive(2)}} className={tabsNumber===2 ? 'right-panel__tabs-button active' : 'right-panel__tabs-button'}>Избранное</button>
            </div>
            {content}

        </div>
    )
}
