import React from 'react'
import MediaPreview from './media-preview'
import ToolTip from './ui/tooltip'

const YourImages = () => {
  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="font-semibold text-xl flex items-center gap-2">Image Gallery

          <ToolTip>This is where you will be able to see all your already uploaded media files.</ToolTip>
        </h2>
        </div>

        <div className="mt-4 mt-4" id="images">

            <MediaPreview />


        </div>
      
    </div>
  )
}

export default YourImages
