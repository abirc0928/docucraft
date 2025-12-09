import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentsByAuthor } from "@/utils/doc-utils";

const AuthorPage = ({params: {name}}) => {
  
  const docs = getDocuments();
  console.log(docs)
  const matchedDocs = getDocumentsByAuthor(docs, name);
  return (
    <ContentDisplay id={matchedDocs[0].id} type="doc"/>
  )
}

export default AuthorPage