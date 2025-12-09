import { getDocumentContent } from "@/lib/doc";
import Link from "next/link";
import Tag from "./Tag";
const ContentDisplay = async ({ id, type }) => {
  const documentContent = await getDocumentContent(id, type);

  return (
    <article className="prose dark:prose-invert">
      <h1>{documentContent.title && documentContent.title}</h1>
      {documentContent.author &&
        <div>
          <span>Published On: {documentContent.date}</span> by {" "}
          <Link href={`/author/${documentContent.author}`}>
            {documentContent.author}
          </Link> {" "}
          under the{" "}
          <Link href={`/categories/${documentContent.category}`}>
            {documentContent.category}
          </Link>{" "}
          category.
        </div>
      }
      <div>
        {documentContent.tags &&
          documentContent.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
      <div
        className="lead"
        dangerouslySetInnerHTML={{ __html: documentContent.contentHtml }} />

    </article>
  )
}

export default ContentDisplay