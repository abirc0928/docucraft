'use client'

import Logo from './Logo'
import Sidebar from './Sidebar'
import Search from './Search'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

const Header = ({ docs }) => {
    const [isOpen, setIsOpen] = useState(false)
    const navbarAction = () => {
        setIsOpen(!isOpen)
    }
 
    return (
        <div>
            <header
                className="fixed inset-y-0 left-0 z-40 contents w-72 overflow-y-auto border-r border-zinc-900/10 px-6 pb-8 pt-4 dark:border-white/10 lg:block xl:w-80"
            >
                <Logo/>
                <div className="fixed inset-x-0 top-0 z-50 bg-white px-4 backdrop-blur-sm transition dark:bg-[#17181C] dark:backdrop-blur sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80">
                    <div className="container flex h-14 items-center justify-between gap-12">
                        <div className="absolute inset-x-0 top-full h-px bg-zinc-900/7.5 transition dark:bg-white/7.5"></div>
                        <Search docs={docs} />

                        <div className="flex items-center gap-5 lg:hidden">
                            <button type="button"
                                className="flex w-6 h-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                                aria-label="Toggle navigation">
                                <Image
                                    src="/hamburger.svg"
                                    alt="Menu" className=" stroke-zinc-900 dark:stroke-white"
                                    width={18}
                                    height={18}
                                    onClick={() => navbarAction()}
                                />
                            </button>
                            <Logo/>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
                            <div className="flex gap-4">
                                <div className="contents lg:hidden">
                                    <button type="button"
                                        className="focus:[&amp;:not(:focus-visible)]:outline-none flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden"
                                        aria-label="Find something...">
                                        <Image src="/search.svg" alt="Search" className="h-5 w-5" width={50}
                                            height={50} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar docs={docs} isOpen={isOpen} />
            </header>
        </div>
    )
}

export default Header
