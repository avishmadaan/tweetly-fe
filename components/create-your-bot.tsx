import React from 'react'
import Popup from './ui/popup'
import { FaCode } from "react-icons/fa";

const CreateYourBot = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Popup 
    closePopup={closePopup}
    className='text-center'
    >
      <FaCode
      size={96}
      className='mx-auto'
       />
       <p className="text-xl mt-4">
         Feature is in Development......

       </p>

    </Popup>

  )
}

export default CreateYourBot
