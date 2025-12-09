import ContentDisplay from '@/components/ContentDisplay'
import React from 'react'

const SubContentPage = ({ params: { subContentId } }) => {
    return (
        <div>
            <ContentDisplay id={subContentId} type="doc"/>
        </div>
    )
}

export default SubContentPage
