import React from 'react'
import Popup from './ui/popup'
import PreviewTweet from './preview-tweet'
import { FileType } from '@/lib/xContext'

const TweetPreviewPopup = (
  { className, closePopup, children, currentTweet, currentPostMedia }:
  {
    children?:React.ReactNode,
      className?:string,
      closePopup:React.Dispatch<React.SetStateAction<boolean>>,
        currentTweet:string,
        currentPostMedia:FileType[]

  }
) => {
  return (
    <Popup
    closePopup={closePopup}
    className={`${className} p-[0px] max-h-[90vh] `}
    >
      {/* <h1 className="text-3xl font-bold text-gray-600 dark:text-white">
      Your Tweet Preview</h1> */}

<div className="overflow-auto h-[60%]">
      <PreviewTweet currentPostMedia={currentPostMedia} currentTweet={currentTweet}
      className='text-left' 
      previewClaim={false}
      />
      </div>

      {children}
      </Popup>
  )
}

export default TweetPreviewPopup
