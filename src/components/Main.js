import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Main.scss';
import TopPanel from './TopPanel/TopPanel';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import WorkSpace from './WorkSpace/WorkSpace';


function Main (props){

    function handleClick(e){
        props.changeTest(props.test+1);
    }

    return (
        <div className='main'>
            <TopPanel></TopPanel>
            <LeftPanel></LeftPanel>
            <RightPanel></RightPanel>
            <WorkSpace></WorkSpace>
        </div>  
    )
}



export default connect()(Main);