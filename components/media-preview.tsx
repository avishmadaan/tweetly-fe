import { XCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const MediaPreview = () => {
    const urls = [
        "https://utfs.io/f/aIroXtB9CoHUd25XOAZ2rvMDbGKSW1ecZ6lUnRL4qFXwgkVH"
        ,
        "https://utfs.io/f/aIroXtB9CoHUnn4LTorEWO0mMKUL8H1pA7Zo6R9nzViyvTGt",
        "https://utfs.io/f/aIroXtB9CoHURdDMiqNVjtTDCBbn20Khu9IUcSZM3LXzOiRr"
]
  return (
    <div className='flex items-center gap-4 flex-wrap'>


      {urls.map((url, index) => (
        <div key={index} className="relative rounded-md border overflow-hidden w-24 h-24">
        
            <Image src={url} alt="media preview" width={54} height={54} className='w-full h-full '  />
          

          <button
          title='Close Button'
          type="button"
          className='absolute top-1 right-1 hover:text-red-500 rounded-full text-white shadow-md bg-black'
        //   onClick={() => removeMediaFiles(index)}
          >
            <XCircle size={16} />
          </button>

        </div>
      ))}
      
    </div>
  )
}

export default MediaPreview
