import React from 'react'
import Popup from './ui/popup'

const CreateYourBot = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Popup 
    closePopup={closePopup}
    >
        Create your Bot Here
    </Popup>

  )
}

export default CreateYourBot
