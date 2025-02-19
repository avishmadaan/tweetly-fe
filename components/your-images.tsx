import React, { Dispatch, useEffect, useState } from 'react'
import { useMedia } from '@/lib/mediaContext'
import Image from 'next/image';
import { ArrowUpFromLine, Loader2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { FileType, UseX } from '@/lib/xContext';
import { useNotification } from './notification/notificationContext';

const YourImages = ({setSelectedMenu, closePopup}:{
  setSelectedMenu:Dispatch<string>,
  closePopup:React.Dispatch<React.SetStateAction<boolean>>

}) => {

  const {mediaFiles, getMediaFiles, deleteMedia} = useMedia();

  const {setCurrentPostMedia, currentPostMedia} = UseX();
  const {showNotification} = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const [tempImages, setTempImages] = useState<FileType[]>([]);

  useEffect(() => {
    findMedia();

  }, [])

  const findMedia = async () => {
    await getMediaFiles();
    console.log(mediaFiles);
  }

  const addMediaFileToArray = (file:FileType) => {
    console.log("add media called");

      if(tempImages.length>=4) {

          showNotification({
            type:"negative",
            message:"Adding more than 4 media files is not allowed"
          })
    
        }
        else {

          setTempImages([...tempImages,file])
          console.log("pushed to temp array")
          console.log(tempImages);
        }
    
  }

  const removeMediaFileToArray = (file:FileType) => {

    setTempImages(tempImages.filter((element) => element !=file));
  }

  const deletingMedia = async (id:string) => {

    setLoading(true);
    await deleteMedia(id);
    setLoading(false);
    findMedia();
  }

  const useSelected = () => {

    const size = currentPostMedia.length;
    const newSize = tempImages.length;

    if(size + newSize >4) {
      showNotification({
        type:"negative",
        message:`Your Posts already has ${size} media files & you are trying to add ${newSize} more, max 4 media files are allowed.`
      })
    }
    else {

      setCurrentPostMedia([...currentPostMedia, ...tempImages]);
  
      closePopup((val: boolean) => !val)

    }



  }

  return (
    <div className='p-4 w-full flex flex-col h-full' >
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="font-semibold text-xl flex items-center gap-2">Image Gallery

        <p className="text-xs">
          ({` ${tempImages.length} Selected `})

          </p>
          {loading && (
            <Loader2 className='animate-spin' />
          )}
        </h2>
        


        <Button
        variant='primary'
        className='py-[10px] text-sm px-[16px]'
        startIcon={<ArrowUpFromLine size={18} />}
        onClick={() => {
          setSelectedMenu("UPLOAD");
        }}
        >
          Upload
        </Button>
        </div>

        <div className="mt-4 overflow-auto  " id="images">
          {
            mediaFiles.length == 0?(
                <p className="">You don&apos;t have any media files yet. </p>
            ):(
              <div className="flex gap-4 flex-wrap">
              {
                mediaFiles.map((file) => (
                  <div key={file.id} className="relative rounded-md border overflow-hidden w-24 h-24 cursor-pointer group">
        
                  <Image src={file.fileURL} alt="media preview" width={54} height={54} className='w-full h-full '  />
                
      
                <button
                title='Trash Button'
                type="button"
                className='absolute -top-0 -right-0 hover:text-red-500  text-white shadow-md bg-black p-[4px]  rounded-l-md group-hover:opacity-100 opacity-0 z-50'
                onClick={() => deletingMedia(file.id)}
                >
                  <Trash2 size={14} />
                </button>

                <div className=" flex items-center justify-center inset-0 absolute " id="selection">

                  <div className="bg-black/50 absolute flex items-center justify-center inset-0 group-hover:opacity-100 opacity-0  " id="select">

                <Button
                variant='primary'
                className='px-[8px] py-[4px] text-xs '
                onClick={() => {
                  console.log("file added")
                  addMediaFileToArray(file)
                }}
               
                >
                  Use
                </Button>

                  </div>

                  <div 
                  className={`bg-black/50 absolute flex items-center justify-center inset-0
                    ${tempImages.includes(file)?" block":" hidden"}
                    `} 
                  id="unselect">

                  <Button
                variant='primary'
                className='px-[8px] py-[4px] text-xs '
                onClick={() => removeMediaFileToArray(file)}
               
                >
                  Unuse
                </Button>


                  </div>




                  
                </div>

              </div>
                ))
              }
              </div>

            )
          
          }

        </div>

        <div className="mt-auto border-t  pt-4 flex justify-end gap-4 items-center" id="setSelectedImages">


          <Button
          variant='primary'
          disabled={tempImages.length ==0?true:false}
          className={`py-[10px] px-[10px] text-sm bg-customBlue dark:bg-customBlue 
          ${tempImages.length>0?"":"dark:bg-gray-500 bg-gray-500"}
          `}
          onClick={useSelected}
          >
            Use Selected
          </Button>


        </div>
      
    </div>
  )
}

export default YourImages
