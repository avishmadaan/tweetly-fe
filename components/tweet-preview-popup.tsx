import React from 'react'
import Popup from './ui/popup'

const TweetPreviewPopup = (
  { className, closePopup, children }:
  {
    children?:React.ReactNode,
      className?:string,
      closePopup:React.Dispatch<React.SetStateAction<boolean>>,

  }
) => {
  return (
    <Popup
    closePopup={closePopup}
    className={className}
    >
      <h1 className="text-3xl font-bold text-gray-600 dark:text-white">
      Your Tweet Preview</h1>

      {/* <PreviewTweet /> */}

      {children}
      </Popup>
  )
}

export default TweetPreviewPopup
