
import React, { useState } from 'react'
import Layouts from '../Layouts/Layouts'
import Tabs from '../Tabs/Tabs'



export default function RightPanelDrawContent() {

    const [content, setContent] = useState(<Layouts></Layouts>)
    return (
        <>
        <Tabs setContent={setContent}></Tabs>
        {content}
        </>
    )
}
