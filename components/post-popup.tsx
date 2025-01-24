import React from 'react'
import Popup from './ui/popup'

const PostPopup = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Popup
    closePopup={closePopup}
    className={` ${"p-[0px] w-[70%] min-h-[70%] flex"}`}
    >
        Post Final Preview

        </Popup>
  )
}

export default PostPopup
