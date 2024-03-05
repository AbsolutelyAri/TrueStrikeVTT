'use client'
import React, {useState, useEffect, ChangeEvent} from "react"
import Link from "next/link"
import {useRouter} from "next/navigation"
import FileUpload from "../../gameboard/_components/ImageUploader"

let navbarMenuItem = "block mt-4 md:inline-block md:mt-0 mr-4 py-2 px-4 rounded border border-red-500 hover:bg-red-500 hover:text-black transition-colors duration-200"

export const Navbar = () => {
    return (
        <div className="flex items-center gap-x-4 p-5 bg-blue-500">
            Navbar
        </div>
    )
    
}

export default Navbar