import ContentDisplay from '@/components/ContentDisplay'
import { getDocuments } from '@/lib/doc'
import { getDocumentsByCategory } from '@/utils/doc-utils'
import React from 'react'

const categoriesPage = ({params : {name}}) => {
  const docs = getDocuments()
  const matchedCategory = getDocumentsByCategory(docs, name)
  return (
    <div>
      <ContentDisplay id={matchedCategory[0].id} type="doc"></ContentDisplay>
    </div>
  )
}

export default categoriesPage
