import React, { useRef, useState } from 'react'
import Popup from './ui/popup'
import { FileUp, Upload, XCircle } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useNotification } from './notification/notificationContext'
import { ButtonUpload } from './ui/upload-button'


const AddMediaPopup = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {

    const {showNotification} = useNotification();
    const inputfileRef = useRef<HTMLInputElement>(null);
    const [mediaFiles, setMediaFiles] = useState<File[]>([])

    const handleButtonClick = () => {
        inputfileRef.current?.click();
    }

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        console.log("files length", files.length);
        if(files.length >4) {
          showNotification({
            message:"You can't upload more than 4 media files",
            type:"negative"
          })
          return;
        }

        const imageFiles = files.filter(file => file.type.startsWith("image/"));

        const videoFiles = files.filter(file => file.type.startsWith('video/'));


        setMediaFiles((prev) => [...prev, ...imageFiles, ...videoFiles]);
  
    }

    const removeMediaFiles = (index:number) => {

      setMediaFiles(files => files.filter((file, num) => index !=num))
    }

    const uploadFiles = () => {
      console.log("files Uploading");
      closePopup(val => !val);
    }

  return (
    <Popup
   closePopup={closePopup}
   className='flex items-center justify-center flex-col gap-2 cursor-auto '
   >
    <FileUp 
    size={96}
    className='text-gray-300 flex items-center justify-center' 
    />
    <p className="mt-0 text-gray-700 dark:text-gray-300 text-sm text-center ">
    Drag Photos/Videos Here


    </p>
    <p className="text-gray-700 text-sm dark:text-gray-300">OR</p>

    <Button
    onClick={handleButtonClick}
    variant='primary'
    startIcon={<Upload  size={16}/>}
    className='text-sm py-[10px]'
    >
        Browse from PC
    </Button>

    

 <ButtonUpload />

    <input 
    title='Upload file'
    ref={inputfileRef}
    type="file"
    className='hidden'
    accept='image/*, video/*'
    multiple
    onChange={handleFileChange}
     />
     {mediaFiles.length>=1 && (

      <div className="bg-gray-300 w-full rounded-md dark:bg-gray-800 p-4 mt-4" id="withUploadButton">

     

     <div className="flex gap-2 justify-center  flex-wrap  " id="thumbnail">

      {mediaFiles.map((file, index) => (
        <div key={index} className="relative rounded-md border overflow-hidden w-24 h-24">
          {file.type.startsWith('image/') ? (
            <Image src={URL.createObjectURL(file)} alt="media preview" width={54} height={54} className='w-full h-full '  />
          ): (
            <video src={URL.createObjectURL(file)} controls={false} className='w-full h-full'></video>
          )}

          <button
          title='Close Button'
          type="button"
          className='absolute top-1 right-1 rounded-full text-white shadow-md bg-black'
          onClick={() => removeMediaFiles(index)}
          >
            <XCircle size={16} />
          </button>

        </div>
      ))}

</div>

      <Button
      className='mx-auto mt-6 bg-customBlue'
      variant='primary'
      onClick={uploadFiles}
      >
        Upload

      </Button>


      

     </div>

)

}
<p className="text-xs text-gray-500 text-center mt-2">*In X, you can only upload upto 4 media items, only 1 can be video upto 2 mins. Yes you upload mix of photos and video. </p>
   </Popup>
    
  )
}

export default AddMediaPopup
