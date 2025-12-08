import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { remark } from "remark"
import html from "remark-html"

const pathDerectory = path.join(process.cwd(), "docs")

export const getDocuments = () => {
    const fileNames = fs.readdirSync(pathDerectory)
    const allDocument = fileNames.map((fileName) => {
        const id = fileName.replace(".md", "")

        const fullPath = path.join(pathDerectory, fileName)

        const fileContent = fs.readFileSync(fullPath, "utf8")
        const metterResult = matter(fileContent)
        return {
            id,
            ...metterResult.data
        }

    })

    return allDocument.sort((a, b) => {
        if (a.order < b.order) {
            return -1
        }
        if (a.order > b.order) {
            return 1
        }
        return 0
    })
}

export const getDocumentContent = async (id) => {
    const filePath = path.join(pathDerectory, `${id}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const metterResult = matter(fileContents)

    const processContent = await remark().use(html).process(metterResult.content)

    const contentHtml = processContent.toString()

    return{
        id,
        contentHtml,
        ...metterResult.data
    }

}