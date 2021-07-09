import React, { useState } from 'react';
import { connect } from 'react-redux';

import './RightPanel.scss';

import Layouts from './Layouts/Layouts';
import Tabs from './Tabs/Tabs';



function RightPanel() {    

    const [content, setContent] = useState(<Layouts></Layouts>)

    return (
        <div className="right-panel">
            <Tabs setContent={setContent}></Tabs>
            {content}
        </div>
    )
}

export default connect()(RightPanel);