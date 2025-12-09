import ContentDisplay from '@/components/ContentDisplay'
import { getDocuments } from '@/lib/doc'
import { getDocumentsByTags } from '@/utils/doc-utils'
import React from 'react'

const tagsPage = ({params : {name}}) => {
  const docs = getDocuments()
  const matchedTags = getDocumentsByTags(docs, name)
  return (
    <div>
      <ContentDisplay id={matchedTags[0].id} type="doc"></ContentDisplay>
    </div>
  )
}

export default tagsPage
