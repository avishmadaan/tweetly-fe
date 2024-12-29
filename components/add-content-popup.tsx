import React from 'react'
import Popup from './ui/popup'

const AddContentPopup = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
   <Popup
   closePopup={closePopup}
   >
    Add Content Here
   </Popup>
  )
}

export default AddContentPopup
