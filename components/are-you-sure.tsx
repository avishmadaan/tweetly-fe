"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import Popup from './ui/popup'
import { CiWarning } from "react-icons/ci";

const AreYouSure = ({ className, closePopup, confirmFunction, description}:{
  children?:React.ReactNode,
  className?:string,
  closePopup:React.Dispatch<React.SetStateAction<boolean>>,
  confirmFunction:() => void,
  description:string
}) => {

  const [loading, setLoading] = useState<boolean>(false);

  const confirmingFunction = async () => {

    setLoading(true);
    await confirmFunction();
    setLoading(false);
    closePopup(val => !val);

  }

  return (

    <Popup
    closePopup={closePopup}
    className={`${className} ${"p-[0px]  flex flex-col"}`}
    >
      

<div className="flex  items-center gap-2 p-6 border-b" id="top">
<CiWarning
size={26}
/>

<h1 className="text-2xl font-semibold">Are You Sure?</h1>


</div>
<div className="mt-4 px-6 my-4 flex-grow" id="contentInside">





    <p className="mt-2 text-gray-500 text-left">{description}</p>

    <div className="button flex items-center justify-end gap-4 mt-8">
        <Button variant='primary'
        onClick={() => closePopup(val =>!val)}
        
        
        >No
        </Button>
        <Button variant='primary' className='dark:!bg-red-500 bg-red-500  dark:text-white '
        loading={loading}
        onClick={confirmingFunction}
        
        >Yes, Clear It
        </Button>
    </div>
    </div>


    </Popup>

    
  )
}

export default AreYouSure
