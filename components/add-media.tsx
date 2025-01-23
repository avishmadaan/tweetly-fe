import React, { useState } from 'react'
import Popup from './ui/popup'
import UploadMediaZone from './upload-media-zone';
import { NavbarItem } from './ui/navbar-item';
import { CloudUpload, Images } from 'lucide-react';
import YourImages from './your-images';



const AddMediaPopup = ({closePopup}:{closePopup:React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [selectedMenu, setSelectedMenu] = useState<string>("GALLERY");


  return (
    <Popup
   closePopup={closePopup}
   className='p-[0px] w-[70%] min-h-[70%] flex '
   >

    <div className="flex flex-grow" id="layoutmedia">

<div className="min-w-[200px] border-r p-4 py-6 flex-grow" id="menu">

<NavbarItem
name='Gallery'
className='item-center mb-2'
icon={<Images />}
url='/'
isActive = {selectedMenu == "GALLERY"}
open={true}
onClick={() => {
  setSelectedMenu("GALLERY")
}}
/>

<NavbarItem
name='Upload'
className='item-center mb-2 hover:bg-gray-200'
icon={<CloudUpload />}
url='/'
isActive =  {selectedMenu == "UPLOAD"}
open={true}
onClick={() => {
  setSelectedMenu("UPLOAD")
}}
/>



</div>

<div className="p-4 pb-0 overflow-auto w-full" id="contentpart">
  {selectedMenu == "UPLOAD"? (
    <UploadMediaZone
    setSelectedMenu={setSelectedMenu}
    
    />

  ):(
    <YourImages
    setSelectedMenu={setSelectedMenu}
    closePopup = {closePopup}
     />
  )}


</div>

    </div>
  

    

   </Popup>
    
  )
}

export default AddMediaPopup

    // const inputfileRef = useRef<HTMLInputElement>(null);
    // const [mediaFiles, setMediaFiles] = useState<File[]>([])



    // const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    //     const files = Array.from(event.target.files || []);

    //     console.log("files length", files.length);
    //     if(files.length >4) {
    //       showNotification({
    //         message:"You can't upload more than 4 media files",
    //         type:"negative"
    //       })
    //       return;
    //     }

    //     const imageFiles = files.filter(file => file.type.startsWith("image/"));

    //     const videoFiles = files.filter(file => file.type.startsWith('video/'));


    //     setMediaFiles((prev) => [...prev, ...imageFiles, ...videoFiles]);
  
    // }

    // const removeMediaFiles = (index:number) => {

    //   setMediaFiles(files => files.filter((file, num) => index !=num))
    // }

    // const uploadFiles = () => {
    //   console.log("files Uploading");
    //   closePopup(val => !val);
    // }

    // const handleButtonClick = () => {
    //     inputfileRef.current?.click();
    // }

  {/* <FileUp 
    size={96}
    className='text-gray-300 flex items-center justify-center' 
    />
    <p className="mt-0 text-gray-700 dark:text-gray-300 text-sm text-center ">
    Drag Photos/Videos Here


    </p>
    <p className="text-gray-700 text-sm dark:text-gray-300">OR</p> */}

    {/* <Button
    onClick={handleButtonClick}
    variant='primary'
    startIcon={<Upload  size={16}/>}
    className='text-sm py-[10px]'
    >
        Browse from PC
    </Button> */}

//     <input 
//     title='Upload file'
//     ref={inputfileRef}
//     type="file"
//     className='hidden'
//     accept='image/*, video/*'
//     multiple
//     onChange={handleFileChange}
//      />
//      {mediaFiles.length>=1 && (

//       <div className="bg-gray-300 w-full rounded-md dark:bg-gray-800 p-4 mt-4" id="withUploadButton">

     

//      <div className="flex gap-2 justify-center  flex-wrap  " id="thumbnail">

//       {mediaFiles.map((file, index) => (
//         <div key={index} className="relative rounded-md border overflow-hidden w-24 h-24">
//           {file.type.startsWith('image/') ? (
//             <Image src={URL.createObjectURL(file)} alt="media preview" width={54} height={54} className='w-full h-full '  />
//           ): (
//             <video src={URL.createObjectURL(file)} controls={false} className='w-full h-full'></video>
//           )}

//           <button
//           title='Close Button'
//           type="button"
//           className='absolute top-1 right-1 rounded-full text-white shadow-md bg-black'
//           onClick={() => removeMediaFiles(index)}
//           >
//             <XCircle size={16} />
//           </button>

//         </div>
//       ))}

// </div>

//       <Button
//       className='mx-auto mt-6 bg-customBlue'
//       variant='primary'
//       onClick={uploadFiles}
//       >
//         Upload

//       </Button>


      

//      </div>

// )

// }