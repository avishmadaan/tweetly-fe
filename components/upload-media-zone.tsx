import React from 'react'
import { OurUploadDropzone } from './ui/upload-button'

const UploadMediaZone = () => {
  return (
    <div className='p-6 '>
        <OurUploadDropzone />

   
<p className="text-xs text-gray-500 text-center mt-2">*In X, you can only upload upto 4 media items, only 1 can be video upto 2 mins. Yes you upload mix of photos and video. </p>
        

      
    </div>
  )
}

export default UploadMediaZone
