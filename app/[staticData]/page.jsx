import ContentDisplay from '@/components/ContentDisplay'
import React from 'react'

const staticDataPage = ({params: {staticData} }) => {
    return (
        <div>
             <ContentDisplay id={staticData} type="static-doc"/>
        </div>
    )
}

export default staticDataPage
