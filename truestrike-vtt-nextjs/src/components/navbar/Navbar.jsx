'use client'
import React from "react"
import Link from "next/link"

let navbarMenuItem = "block mt-4 md:inline-block md:mt-0 mr-4 py-2 px-4 rounded border border-red-500 hover:bg-red-500 hover:text-black transition-colors duration-200"

const Navbar = () => {
    return (
        <nav className="bg-black text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">TrueStrike VTT</div>
                <div className="md:flex items-center">
                    <Link href="/upload-maps">
                        <div className={navbarMenuItem}>
                            Upload Map
                        </div>
                    </Link>
                    <Link href="/settings">
                        <div className={navbarMenuItem}>
                            Settings
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar