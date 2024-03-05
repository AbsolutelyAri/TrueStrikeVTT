import React from "react";
import Image from "next/image"

const FileUpload = ({onImageUpload}) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file){
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUpload(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className="h-full flex flex-col items-center bg-red-500">
            
            <Image src={handleFileChange} alt="Empty" height={200} width={200}/>
            
        </div>
        
    )
}

export default FileUpload