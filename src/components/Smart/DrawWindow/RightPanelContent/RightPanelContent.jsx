import React, {useState} from 'react';
import {connect} from 'react-redux';

import Layouts from './Layouts/Layouts';
import Tabs from './Tabs/Tabs';


function RightPanelContent() {
    const [content, setContent] = useState(<Layouts></Layouts>);
    return (<>
                <Tabs setContent={setContent}></Tabs>
                {content}
            </>
    );
}

export default connect()(RightPanelContent);