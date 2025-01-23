"use client"
import { FileType, UseX } from '@/lib/xContext'
import { XCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'

const MediaPreview = () => {

  const {currentPostMedia, setCurrentPostMedia} = UseX();

  const removeMediaFromPost = (file:FileType) => {

    setCurrentPostMedia(currentPostMedia.filter((entry) => entry !=file));

  }

  return (
    <div className='flex items-center gap-4 flex-wrap'>


      {currentPostMedia.map((file, index) => (
        <div key={index} className="relative rounded-md border overflow-hidden w-24 h-24">
        
            <Image src={file.fileURL} alt="media preview" width={54} height={54} className='w-full h-full '  />
          

          <button
          title='Close Button'
          type="button"
          className='absolute top-1 right-1 hover:text-red-500 rounded-full text-white shadow-md bg-black'
          onClick={() => removeMediaFromPost(file)}
          >
            <XCircle size={16}
             />
          </button>

        </div>
      ))}
      
    </div>
  )
}

export default MediaPreview
