import fs from "fs"
import matter from "gray-matter"
import path from "path"
import { remark } from "remark"
import html from "remark-html"

const pathDerectory = path.join(process.cwd(), "docs")
const staticPathDerectory = path.join(process.cwd(), "static-docs")

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

export const getDocumentContent = async (id, docType) => {
    let filePath;

    if (docType === 'doc') {
        filePath = path.join(pathDerectory, `${id}.md`);
    } else if (docType === 'static-doc') {
        filePath = path.join(staticPathDerectory, `${id}.md`);
    } else {
        throw new Error(`Invalid docType: ${docType}`);
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);

    return {
        id,
        contentHtml: processedContent.toString(),
        ...matterResult.data,
    };
};
