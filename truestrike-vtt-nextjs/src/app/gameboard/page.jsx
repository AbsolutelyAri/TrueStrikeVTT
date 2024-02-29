'use client'

import React, {useState} from "react";
import ImageUploader from "./ImageUploader.js"

export default function GameBoard() {
    const [backgroundImage, setBackgroundImage] = useState(false)
    const [tokens, setTokens] = useState([])

    const handleImageUpload = (image) => {
        setBackgroundImage(image)
    }
    
    return (
        <div className="relative w-full h-full">
            <ImageUploader onImageUpload={handleImageUpload}/>
            <div className="inset-0 grid absolute bg-cover"
                 style={{
                    backgroundImage: `url(https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg)`,
                    gridTemplateColumns: `repeat(auto-fill, minmax(50px, 1fr))`,
                    zIndex: 1
            }}>
                
            </div>
        </div>
    )
}