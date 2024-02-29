import React from "react";

const FileUpload = ({onImageUpload}) => {
    const handleFileChange = (e) => {
        const file = e.target.file[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            onImageUpload(reader.result)
        }
        reader.readAsDataURL(file)
    }
    return (
        <input type="file" onChange={handleFileChange} accept="image/*" />


    )
}

export default FileUpload