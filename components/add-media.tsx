import React, { useRef } from 'react'
import Popup from './ui/popup'
import { FileUp, Upload } from 'lucide-react'
import { Button } from './ui/button'

const AddMediaPopup = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {

    const inputfileRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputfileRef.current?.click();
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        console.log(files)
    }

  return (
    <Popup
   closePopup={closePopup}
   className='flex items-center justify-center flex-col gap-2'
   >
    <FileUp 
    size={96}
    className='text-gray-300 flex items-center justify-center' 
    />
    <p className="mt-0 text-gray-700 text-sm text-center ">
    Drag Photos/Videos Here


    </p>
    <p className="text-gray-700 text-sm">OR</p>

    <Button
    onClick={handleButtonClick}
    variant='primary'
    startIcon={<Upload  size={16}/>}
    className='text-sm py-[10px]'
    >
        Browse from PC
    </Button>

    <input 
    title='Upload file'
    ref={inputfileRef}
    type="file"
    className='hidden'
    accept='images/*,video/*'
    multiple
    onChange={handleFileChange}
     />
   </Popup>
    
  )
}

export default AddMediaPopup
