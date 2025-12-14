'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
    getDocumentsByTags,
    getDocumentsByAuthor,
    getDocumentsByCategory
} from "@/utils/doc-utils"

const Sidebar = ({ docs, isNavOpen }) => {
    const pathName = usePathname()
    const [rootNodes, setRootNodes] = useState([])
    const [nonRootNodes, setNonRootNodes] = useState({})

    const isRootActive = (id) =>
        pathName === `/docs/${id}` || pathName.startsWith(`/docs/${id}/`)

    const isSubActive = (rootId, subId) =>
        pathName === `/docs/${rootId}/${subId}`

    useEffect(() => {
        let matchedDocs = docs

        if (pathName.includes('/tags')) {
            const tag = pathName.split('/')[2]
            matchedDocs = getDocumentsByTags(docs, tag)
        } else if (pathName.includes('/author')) {
            const author = pathName.split('/')[2]
            matchedDocs = getDocumentsByAuthor(docs, author)
        } else if (pathName.includes('/categories')) {
            const category = pathName.split('/')[2]
            matchedDocs = getDocumentsByCategory(docs, category)
        }

        const roots = matchedDocs.filter((item) => !item.parent)

        const nonRoots = Object.groupBy(
            matchedDocs.filter((item) => item.parent),
            ({ parent }) => parent
        )

        const nonRootsKeys = Reflect.ownKeys(nonRoots)

        nonRootsKeys.forEach(key => {
            const foundInRoots = roots.find((root) => root.id === key)
            if (!foundInRoots) {
                const foundInDocs = docs.find((doc) => doc.id == key)
                if (foundInDocs) roots.push(foundInDocs)
            }
        })

        roots.sort((a, b) => a.order - b.order)

        setRootNodes([...roots])
        setNonRootNodes({ ...nonRoots })
    }, [pathName, docs])

    return (
        <nav className={`${isNavOpen ? "block mt-10" : "hidden"} lg:mt-10 lg:block z-50`}>
            <ul>
                <div className="relative mt-3 pl-2">
                    <div className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"></div>
                    <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>

                    <ul role="list" className="border-l border-transparent">
                        {rootNodes.map((rootNode) => (
                            <li key={rootNode.id} className="relative">


                                {isRootActive(rootNode.id) && (
                                    <div className="absolute  h-6 w-px bg-emerald-500"></div>
                                )}

                                <Link
                                    aria-current={isRootActive(rootNode.id) ? "page" : undefined}
                                    className={`flex justify-between gap-2 py-1 pl-4 pr-3 text-sm transition 
                                        ${isRootActive(rootNode.id)
                                            ? "text-emerald-600 font-medium"
                                            : "text-zinc-900 dark:text-white"
                                        }`}

                                    href={`/docs/${rootNode.id}`}
                                >
                                    <span className="truncate">{rootNode.title}</span>
                                </Link>

                                {nonRootNodes[rootNode.id] && (
                                    <ul role="list" className="border-l border-transparent">
                                        {nonRootNodes[rootNode.id].map((subRoot) => (
                                            <li key={subRoot.id}>
                                                {isSubActive(rootNode.id, subRoot.id) && (
                                                    <div>
                                                        {/* <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div> */}
                                                        <div className="absolute left-3 h-6 w-px bg-emerald-500"></div>
                                                    </div>
                                                )}
                                                <Link
                                                    className={`flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition 
                                                       ${isSubActive(rootNode.id, subRoot.id)
                                                            ? "text-emerald-600 font-medium"
                                                            : "text-zinc-900 dark:text-white"
                                                        }`}
                                                    href={`/docs/${rootNode.id}/${subRoot.id}`}
                                                >
                                                    <span className="truncate">{subRoot.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            </li>
                        ))}
                    </ul>
                </div>
            </ul>
        </nav>
    )
}

export default Sidebar
