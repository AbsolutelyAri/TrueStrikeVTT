'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {useState} from 'react';

export default function DashboardPage() {
  const [imageUrl, setImageUrl] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file && file.type.startsWith('image/')){
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  return (
    <div className="flex-1 h-[100%-80px] p-6">
      Dashboard
      <input type='file' onChange={handleFileChange} accept="image/*"/>
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" className= 'h-auto'/>}
    </div>
  )
}
