import React from 'react'
import { OurUploadDropzone } from './ui/upload-button'

const UploadMediaZone = (
 { setSelectedMenu} :{
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
 }
) => {
  return (
    <div className='p-6 h-full'>
        <OurUploadDropzone 
        setSelectedMenu={setSelectedMenu}
        
        
        />

   
<p className="text-xs text-gray-500 text-center mt-2">*In X, you can only upload upto 4 media items, only 1 can be video upto 2 mins. Yes you upload mix of photos and video. </p>
        

      
    </div>
  )
}

export default UploadMediaZone
