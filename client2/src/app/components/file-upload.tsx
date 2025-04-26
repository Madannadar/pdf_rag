'use client'
import * as React from 'react';
import { Upload } from 'lucide-react'
// import { Upload } from 'lucide-react' // lucide-react is a library of icons for react
const FileUpload: React.FC = () => {
// i do not know what React.FC is but i know that it is a type of function component in react
// i will use it to define the type of the function component
    const handelFileUploadButtonClick = () => {
        const element = document.createElement('input');
        element.setAttribute('type', 'file');
        element.setAttribute('accept', 'application/pdf'); // accept only pdf files
        element.addEventListener('change', (event) => {
            if (element.files && element.files.length > 0) {
                const file = element.files[0];
                if (file) {
                    const formData = new FormData()
                    formData.append('pdf', file)
                    fetch('http://localhost:8000/upload/pdf', {
                        method: "POST",
                        body: formData,
                    })
                    console.log('file uploaded successfully');
                };
                // console.log(file);
                // console.log(element.files);
            }
        })
        element.click();
    }

    return (
        <div className='bg-slate-900 text-white shadow-2xl flex justify-center p-4 rounded-lg'>
            <div onClick={handelFileUploadButtonClick} className='flex justify-center items-center flex-col'>
                <h3>Upload PDF file</h3>
                <Upload />
            </div>
        </div>
    )
};

export default FileUpload;