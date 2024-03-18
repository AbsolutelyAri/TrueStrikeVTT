import React from "react";

function FileUpload({onFileUpload}) {

    return (
        <div className=''>
            <input type="file" onChange={onFileUpload}></input>
        </div>
    )
}

export default FileUpload
